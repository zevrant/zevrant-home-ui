package net.zevrantservices.home.ui.zevranthomeui.config;

import com.netflix.config.ConfigurationManager;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HystrixConfig {

    public HystrixConfig() {
        ConfigurationManager.getConfigInstance()
                .setProperty("hystrix.command.default.circuitBreaker.enabled", false);
    }
}
