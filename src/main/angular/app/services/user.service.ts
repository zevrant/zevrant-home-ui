import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";
import {BehaviorSubject} from "rxjs";
import {RoleResponse} from "../rest/response/RoleResponse";
import {AddRole} from "../rest/request/AddRole";
import {HttpClient} from "@angular/common/http";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {LocalStorageService, StorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _roles: Object = {};

  constructor(private http: HttpService, private httpClient: HttpClient, private storage: LocalStorageService) {
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

  public async getAllUserRoles(): Promise<Array<string>> {
    return <Promise<Array<string>>> this.http.get(Constants.oauthBaseUrl + "user/all-roles", null).then((data) => {
      data.forEach((role) => {
        this._roles[role] = new BehaviorSubject<boolean>(false);
      });
    });

  }

  public searchRoles(page: any, pageSize: any): Promise<any> {
    return this.httpClient.get(Constants.oauthBaseUrl + `user/roles/search/${page}/${pageSize}`, {headers: null}).toPromise();
  }

  updateUsers(users: User[]) {
    return this.http.put(Constants.oauthBaseUrl + "user/bulk", null, users);
  }

  getRoles(username: string) {
    if(!isNotNullOrUndefined(username)) {
      return null;
    }
    this.http.get(Constants.oauthBaseUrl + `user/roles/${username}`, null).then((data) => {
      data.forEach((role) => {
        this._roles[role].next(true);
      })
    }).catch((error) => {
      if(error && error.error && error.error.error == "invalid_token") {
        this.storage.clear();
      }
    });

  }

  addRole(role: string, desc: string) {
    let addRole = new AddRole(role, desc);
    return this.http.post(Constants.oauthBaseUrl + "user/roles", null, addRole);
  }


  hasRole(role: string): BehaviorSubject<boolean> {
    if(isNotNullOrUndefined(this._roles[role])) {
      return this._roles[role];
    }
    this._roles[role] = new BehaviorSubject<boolean>(false);
    return this._roles[role];
  }

  deleteRoles() {
    this._roles = {};
  }

  get roles(): Object {
    return this._roles;
  }
}
