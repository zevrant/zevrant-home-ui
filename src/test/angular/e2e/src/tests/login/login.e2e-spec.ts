import {AppPage} from '../../pages/app.po';
import {browser, logging} from 'protractor';
import {AWSError} from "aws-sdk";
import {GetSecretValueResponse} from "aws-sdk/clients/secretsmanager";
import {SecretsManagerService} from "../../services/secretsManager.service";

describe('workspace-project App', () => {
  let page: AppPage;
  let secretValue: string;
  let username: string;
  const secretsManagerService: SecretsManagerService = new SecretsManagerService();

  let getSecretCallback = (err: AWSError, data: GetSecretValueResponse) => {
    if(err) {
      throw err;
    }
    secretValue = data.SecretString;
  }

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login', () => {
    page.navigateTo();
    page.navigateToLogin();
    secretsManagerService.getSecret("/dev/ui/test/username", getSecretCallback);
    username = secretValue;
    page.typeUsername(secretValue);
    secretsManagerService.getSecret("/dev/ui/test/password", getSecretCallback);
    page.typePassword(secretValue);
    page.submit()
    expect(page.getUsername).toEqual(username);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
