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
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private baseUrl: string;
  username: string;
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isPrints: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

      this.checkRoles();
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
    let headers: HttpHeaders = new HttpHeaders().set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
    return this.http.get(Constants.oauthBaseUrl + "user/username", headers).then((data) => {
      this.username = JSON.parse(JSON.stringify(data)).username;
      this.storage.set(Constants.username, this.username);
    });
  }

  logout() {
    this.http.delete(Constants.oauthBaseUrl + "token", null).then(() => {
      this.storage.remove(Constants.username);
      this.storage.remove(Constants.oauthTokenName);
      this.username = null;
      this.router.navigate([""]);
      this.loginService.logout();
    });
  }

  private hasRole(role: string, subject: BehaviorSubject<boolean>) {
    subject.next(Constants.getRoles().indexOf(role) >= 0);
  }

  private getRoles(){
    this.userService.getRoles(this.storage.get(Constants.username)).then((data) => {
      Constants.setRoles(data);
      this.checkRoles();
    }).catch(err => {
      console.log(err);
    });
  }

  private checkRoles() {
    this.hasRole('admin', this.isAdmin);
    this.hasRole('prints', this.isPrints);
  }

}
