import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";
import {BehaviorSubject} from "rxjs";
import {RoleResponse} from "../rest/response/RoleResponse";
import {AddRole} from "../rest/request/AddRole";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService, private httpClient: HttpClient) {
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
    return this.http.get(Constants.oauthBaseUrl + "user/all-roles", null);
  }

  public searchRoles(page: any, pageSize: any): Promise<any> {
    return this.httpClient.get(Constants.oauthBaseUrl + `user/roles/search/${page}/${pageSize}`, {headers: null}).toPromise();
  }

  updateUsers(users: User[]) {
    return this.http.put(Constants.oauthBaseUrl + "user/bulk", null, users);
  }

  async getRoles(username: string): Promise<string[]> {
    return this.http.get(Constants.oauthBaseUrl + `user/roles/${username}`, null);
  }

  addRole(role: string, desc: string) {
    let addRole = new AddRole(role, desc);
    return this.http.post(Constants.oauthBaseUrl + "user/roles", null, addRole);
  }


}
