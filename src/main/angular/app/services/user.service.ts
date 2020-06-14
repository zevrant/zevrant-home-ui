import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) {
  }

  public getUserByName(username: String): Promise<User> {
    return this.http.get(Constants.oauthBaseUrl + `user/${username}`, null)
  }

  public updateUserInfo(user: User) {
    return this.http.put(Constants.oauthBaseUrl + "user", null, user);
  }

  public getAllUsers(): Promise<User[]> {
    return this.http.get(Constants.oauthBaseUrl + "user", null);
  }

  public getAllUserRoles(): Promise<string[]> {
    return this.http.get(Constants.oauthBaseUrl + "user/roles", null);
  }

  updateUsers(users: User[]) {
    return this.http.put(Constants.oauthBaseUrl + "user/bulk", null, users);
  }

  async getRoles(username: string): Promise<string[]> {
    return this.http.get(Constants.oauthBaseUrl + `user/roles/${username}`, null);
  }
}
