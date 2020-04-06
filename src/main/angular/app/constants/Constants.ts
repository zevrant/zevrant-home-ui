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

  public static get modelBaseUrl() {
    return "zuul/zevrant-model-service/";
  }

  public static get baseUrl(): string {
    if (environment.production) {
      return "https://192.168.1.223:9002/"
    } else {
      return "http://zevrant.fios-router.home:8000/"
    }
  }
}
