package com.zevrant.services.zevranthomeui.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zevrant.services.zevranthomeui.exceptions.CodeExchangeException;
import com.zevrant.services.zevranthomeui.pojo.CodeExchangeRequest;
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
            try {
                return Mono.just(objectMapper.readValue(body.asInputStream(), CodeExchangeRequest.class));
            } catch (IOException e) {
                return Mono.error(e);
            }
        }).flatMap(codeExchangeRequest -> webClient.post()
                .uri(keycloakUrl.concat("/auth/realms/zevrant-services/protocol/openid-connect/token"))
                .body(BodyInserters
                        .fromFormData("client_id", codeExchangeRequest.getClientId())
                        .with("grant_type", codeExchangeRequest.getGrantType())
                        .with("code", codeExchangeRequest.getCode())
                        .with("redirect_uri", codeExchangeRequest.getRedirectUri()))
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, (clientResponse) ->
                        clientResponse.bodyToMono(String.class).flatMap((clientResponseBody ->
                                Mono.just(new CodeExchangeException(clientResponseBody)))))
                .bodyToMono(String.class)
                .flatMap(bodyString -> ServerResponse
                        .ok()
                        .bodyValue(bodyString)))));
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
