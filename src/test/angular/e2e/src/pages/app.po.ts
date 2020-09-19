import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText(): Promise<string> {
    return element(by.tagName('title')).getWebElement().getText() as Promise<string>;
  }

  navigateToLogin() {
    return element(by.id("loginButton")).getWebElement().click()
  }

  typeUsername(username: string) {
    return element(by.id("username")).sendKeys(username);
  }

  typePassword(password: string) {
    return element(by.id("password")).sendKeys(password);
  }

  submit() {
    return element(by.id("loginSubmit")).getWebElement().click();
  }

  getUsername(): Promise<string> {
    return element(by.id('userMenu')).getWebElement().getText() as Promise<string>;
  }
}
