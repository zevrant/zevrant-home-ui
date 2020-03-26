import {environment} from "../../environments/environment";

export class Constants {

  public static get oauthTokenName(): string {
    return "LOCAL_STORAGE_TOKEN";
  }

  public static get oauthBaseUrl(): string {
    return "zevrant-oauth2-service/";
  }

  public static get username() {
    return "USERNAME"
  }

  public static get baseUrl(): string {
    if(environment.production) {
      return "https://zevrant-services.com:7446/"
    } else {
      return "http://zevrant.fios-router.home:8000/"
    }
  }
}
