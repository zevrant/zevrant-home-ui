import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) {
  }

  public getUserByName(username: String): Promise<User> {
    return this.http.get(Constants.oauthBaseUrl + `user/${username}`, null)
  }

}
