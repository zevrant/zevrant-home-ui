package com.zevrant.services.zevranthomeui.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class RouteConfig {
    private static final Logger logger = LoggerFactory.getLogger(RouteConfig.class);

    @Bean
    public RouterFunction<ServerResponse> routerFunction() {

        return RouterFunctions.route(RequestPredicates.GET("/auth/authentication*"), req -> {
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
        });
    }

    private class OAuthRedirect {
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
