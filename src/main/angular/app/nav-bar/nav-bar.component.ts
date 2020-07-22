import {Component, OnInit} from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {Constants} from "../constants/Constants";
import {HttpHeaders} from "@angular/common/http";
import {PlatformLocation} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {HttpService} from "../services/http.service";
import {LocalStorageService} from "angular-web-storage";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private baseUrl: string;
  username: string;
  private subcription: any;
  private logoutSubscription: any;

  constructor(private storage: LocalStorageService, private http: HttpService,
              private platformLocation: PlatformLocation, private router: Router, private loginService: LoginService,
              private userService: UserService) {
    this.baseUrl = Constants.baseUrl;
    this.username = (this.storage.get(Constants.username)) ? this.storage.get("username") : "Login";

  }

  ngOnInit() {
    this.getRoles();
    this.subcription = this.loginService.getLoginEmitter().subscribe((event) => {
      this.getUsername().then(() => {
        this.getRoles();
      });

    });

    this.logoutSubscription = this.loginService.logoutEmitter.subscribe((event)=>{
      this.username = null;
      this.userService.deleteRoles();
      this.router.navigate(["login"]);
    })

  }

  isLoggedIn(): boolean {
    let isDefined = isNotNullOrUndefined(this.storage.get(Constants.oauthTokenName));
    if(isDefined){
      let expiresIn = this.storage.get(Constants.expiresInName);
      let currentDate = new Date();
      if(expiresIn && currentDate.getTime() > expiresIn) {
        this.storage.clear();
        this.loginService.logoutEmitter.emit("loggedOut");
        return false;
      }else{
        this.username = this.storage.get(Constants.username);
        return true;
      }
    }
    return false;
  }

  private getUsername() {
    let token = this.storage.get(Constants.oauthTokenName);
    let headers: HttpHeaders = new HttpHeaders().set("Authorization", "bearer " + token);
    return this.http.get(Constants.oauthBaseUrl + "user/username", headers).then((data) => {
      this.username = JSON.parse(JSON.stringify(data)).username;
      this.storage.set(Constants.username, this.username);
    });
  }

  logout() {
    this.http.delete(Constants.oauthBaseUrl + `token/${this.username}`, null).then(() => {
      this.storage.remove(Constants.username);
      this.storage.remove(Constants.oauthTokenName);
      this.router.navigate([""]);
      this.loginService.logout();
    });
  }

  hasRole(role: string): BehaviorSubject<boolean> {
    return this.userService.hasRole(role)
  }

  private getRoles(){
    this.userService.getAllUserRoles()
    if(!isNotNullOrUndefined(this.storage.get(Constants.username))){
      this.getUsername().then(() => {
        this.getRolesHelper()
      });
    } else {
      this.getRolesHelper()
    }
  }

  private getRolesHelper() {
    this.userService.getRoles(this.storage.get(Constants.username));
  }

}
