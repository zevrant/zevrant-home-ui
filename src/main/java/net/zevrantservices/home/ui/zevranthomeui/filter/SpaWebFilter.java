package net.zevrantservices.home.ui.zevranthomeui.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class SpaWebFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        if (!path.startsWith("/zevrant")
                && !path.startsWith("/socket.io")
                && !path.endsWith(".js")
                && !path.endsWith(".css")) {
            return chain.filter(
                    exchange.mutate().request(exchange.getRequest().mutate().path("/index.html").build()
                    ).build());
        }
        return chain.filter(exchange);
    }
}
