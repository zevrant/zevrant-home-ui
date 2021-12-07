package com.zevrant.services.zevranthomeui.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zevrant.services.zevranthomeui.exceptions.CodeExchangeException;
import com.zevrant.services.zevranthomeui.pojo.CodeExchangeRequest;
import com.zevrant.services.zevranthomeui.pojo.TokenRefreshRequest;
import io.micrometer.core.instrument.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class RouteConfig {
    private static final Logger logger = LoggerFactory.getLogger(RouteConfig.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }

    @Bean
    public RouterFunction<ServerResponse> routerFunction(WebClient webClient,
                                                         @Value("${zevrant.services.keycloak.baseUrl}") String keycloakUrl) {

        return RouterFunctions.route(RequestPredicates.headers((headers) -> headers.header("AndroidRedirect").size() > 0), req -> {
            String sessionState = req.queryParam("session_state").orElseThrow(() -> new RuntimeException("Missing session_state query parameter"));
            String code = req.queryParam("code").orElseThrow(() -> new RuntimeException("Missing code query parameter"));
            try {
                String base64EncodedBody = new String(Base64.getEncoder().encode(new ObjectMapper().writeValueAsBytes(new OAuthRedirect(sessionState, code))), StandardCharsets.UTF_8);
                return ServerResponse.temporaryRedirect(URI.create("zevrant://zevrant-services/?body=".concat(base64EncodedBody))).build();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                logger.error("Failed to write OAuth information to bytes");
                throw new RuntimeException("Failed to write OAuth information to bytes");
            }
        }).andRoute(RequestPredicates.POST("/auth/realms/zevrant-services/protocol/openid-connect/token")
                .and(RequestPredicates.contentType(MediaType.APPLICATION_JSON)), req -> req.body((inputMessage, context) -> inputMessage.getBody().next().flatMap(body -> {

            StringBuilder responseBuilder = new StringBuilder();
            return Mono.just(body.asInputStream())
                    .publishOn(Schedulers.boundedElastic())
                    .flatMap(inputStream -> {
                        byte[] bytes = new byte[1024];
                        while (true) {
                            try {
                                if (!(inputStream.read(bytes) > 0)) break;
                                responseBuilder.append(new String(bytes, StandardCharsets.UTF_8));
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        return Mono.just(responseBuilder.toString());
                    }).flatMap(responseString -> {
                        try {
                            if (responseString.contains("refreshToken")) {
                                return Mono.just(objectMapper.readValue(responseString, TokenRefreshRequest.class));
                            } else {
                                return Mono.just(objectMapper.readValue(responseString, CodeExchangeRequest.class));
                            }
                        } catch (IOException e) {
                            return Mono.error(e);
                        }
                    });
        }).flatMap(tokenRequest -> {
            BodyInserters.FormInserter<String> inserter = BodyInserters
                    .fromFormData("client_id", tokenRequest.getClientId())
                    .with("grant_type", tokenRequest.getGrantType());
            if (tokenRequest instanceof CodeExchangeRequest) {
                CodeExchangeRequest codeExchangeRequest = (CodeExchangeRequest) tokenRequest;
                inserter = inserter.with("code", codeExchangeRequest.getCode())
                        .with("redirect_uri", codeExchangeRequest.getRedirectUri());
            } else {
                TokenRefreshRequest tokenRefreshRequest = (TokenRefreshRequest) tokenRequest;
                inserter = (StringUtils.isNotBlank(tokenRefreshRequest.getClientSecret()))
                        ? inserter.with("client_secret", tokenRefreshRequest.getClientSecret())
                        : inserter;
                inserter = inserter.with("refresh_token", tokenRefreshRequest.getRefreshToken());
            }
            return webClient.post()
                    .uri(keycloakUrl.concat("/auth/realms/zevrant-services/protocol/openid-connect/token"))
                    .body(inserter)
                    .retrieve()
                    .onStatus(HttpStatus::is4xxClientError, (clientResponse) ->
                            clientResponse.bodyToMono(String.class).flatMap((clientResponseBody ->
                                    Mono.just(new CodeExchangeException(clientResponseBody)))))
                    .bodyToMono(String.class)
                    .flatMap(bodyString -> ServerResponse
                            .ok()
                            .bodyValue(bodyString));
        })));
    }

    private static class OAuthRedirect {
        private String sessionState;
        private String code;

        public OAuthRedirect(String sessionState, String code) {
            this.sessionState = sessionState;
            this.code = code;
        }

        public OAuthRedirect() {
        }

        public String getSessionState() {
            return sessionState;
        }

        public void setSessionState(String sessionState) {
            this.sessionState = sessionState;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }
}
