package net.zevrantservices.home.ui.zevranthomeui.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
public class ForwardingController {

  @RequestMapping("/{path:[^\\.]+}/**")
  public String forward() {
    return "forward:/";
  }

  @RequestMapping("main/angular/favicon.ico")
  public byte[] getFavIcon() throws IOException {
    ClassPathResource resource = new ClassPathResource("favicon.ico");
    return resource.getInputStream().readAllBytes();
  }
}
