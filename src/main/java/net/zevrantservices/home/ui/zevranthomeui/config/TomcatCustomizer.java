package net.zevrantservices.home.ui.zevranthomeui.config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;

public class TomcatCustomizer implements
  WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

  @Override
  public void customize(ConfigurableServletWebServerFactory factory) {
    TomcatServletWebServerFactory tomcatFactory = (TomcatServletWebServerFactory) factory;
    tomcatFactory.addConnectorCustomizers((connector) -> {
      connector.setMaxPostSize(999999999);
    });
  }
}
