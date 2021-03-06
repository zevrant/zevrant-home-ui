package net.zevrantservices.home.ui.zevranthomeui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableDiscoveryClient
@EnableZuulProxy
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ZevrantHomeUiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZevrantHomeUiApplication.class, args);
    }

}
