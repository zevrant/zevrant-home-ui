package net.zevrantservices.home.ui.zevranthomeui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ZevrantHomeUiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZevrantHomeUiApplication.class, args);
    }

}
