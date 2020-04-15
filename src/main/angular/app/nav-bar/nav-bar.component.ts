import {Component, Inject, OnInit} from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {Constants} from "../constants/Constants";
import {HttpHeaders} from "@angular/common/http";
import {PlatformLocation} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {HttpService} from "../services/http.service";
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private baseUrl: string;
  username: string;
  private subcription: any;

  constructor(private storage: LocalStorageService, private http: HttpService,
              private platformLocation: PlatformLocation, private router: Router, private loginService: LoginService) {
    this.baseUrl = Constants.baseUrl;
    this.username = (this.storage.get(Constants.username)) ? this.storage.get("username") : "Login";
  }

  ngOnInit() {
    this.subcription = this.loginService.getLoginEmitter().subscribe((event) => {
      let headers: HttpHeaders = new HttpHeaders().set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
      this.http.get(Constants.oauthBaseUrl + "user/username", headers).then((data) => {
        this.username = JSON.parse(JSON.stringify(data)).username;
        this.storage.set(Constants.username, this.username);
      });
    })
  }

  isLoggedIn() {
    return isNotNullOrUndefined(this.storage.get(Constants.oauthTokenName));
  }

  logout() {
    this.http.delete(Constants.oauthBaseUrl + "token", null).then(() => {
      this.storage.remove(Constants.username);
      this.storage.remove(Constants.oauthTokenName);
      this.username = null;
      this.router.navigate([""]);
    });
  }

}
