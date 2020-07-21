package net.zevrantservices.home.ui.zevranthomeui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.io.InputStream;

@Controller
public class ForwardingController {

  @RequestMapping("/{path:[^\\.]+}/**")
  public String forward() {
    return "forward:/";
  }

  @RequestMapping("/favicon.ico")
  public InputStream getFavIcon() throws IOException {
    return getClass().getResourceAsStream("/angular/favicon.ico");
  }
}
