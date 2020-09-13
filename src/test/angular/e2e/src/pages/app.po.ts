import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('title')).getWebElement().getText() as Promise<string>;
  }

  navigateToLogin() {
    element(by.id("loginButton")).getWebElement().click()
  }

  typeUsername(username: string) {
    element(by.id("username")).getWebElement().sendKeys(username);
  }

  typePassword(password: string) {
    element(by.id("password")).getWebElement().sendKeys(password);
  }

  submit() {
    element(by.id("loginSubmit")).getWebElement().click();
  }

  getUsername() {
    element(by.id("userMenu")).getWebElement().getText();
  }
}
