import {Component, OnInit} from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {ADMIN_ROLE, Constants, DND_ROLE, PRINTS_ROLE} from "../constants/Constants";
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
  private isModels: BehaviorSubject<boolean>;
  private isDnd: BehaviorSubject<boolean>;
  public ADMIN_ROLE = ADMIN_ROLE;
  public PRINTS_ROLE = PRINTS_ROLE;
  public DND_ROLE = DND_ROLE;
  private permissions: Array<BehaviorSubject<boolean>> = [];
  public Promise = Promise;
  public userLoggedIn: boolean = undefined;
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private storage: LocalStorageService, private http: HttpService,
              private platformLocation: PlatformLocation, private router: Router, private loginService: LoginService,
              private userService: UserService) {
    this.baseUrl = Constants.baseUrl;
    this.username = (this.storage.get(Constants.username)) ? this.storage.get("username") : "Login";
    this.permissions[ADMIN_ROLE] = new BehaviorSubject<boolean>(false);
    this.permissions[PRINTS_ROLE] = new BehaviorSubject<boolean>(false)
  }

  ngOnInit() {
    if(this.isLoggedIn()) {
      this.username = (this.storage.get(Constants.username));
      this.userService.getAllUserRoles()
      this.getRoles();
    }

    this.subcription = this.loginService.getLoginEmitter().subscribe(async (event) => {
      this.getRoles();
      await this.userService.getAllUserRoles();
      let username = (await this.userService.getUsername()).username;
      this.storage.set(Constants.username, username);
      this.username = username;
      this.userLoggedIn = undefined;
    });

    this.logoutSubscription = this.loginService.logoutEmitter.subscribe(()=>{
      this.username = null;
      this.userService.deleteRoles();
      this.router.navigate(["login"]);
      this.userService.deleteRoles()
    })

  }

  public hasRole(role: string) {
    console.log(role + ": " + this.userService.hasRole(role))
    this.userService.hasRole(role);
    return true;
  }

  public getRoles() {
    if(this.username !== 'Login') {
      this.userService.getRoles(this.username);
    }
  }

  public isLoggedIn(): boolean {
    return isNotNullOrUndefined(this.storage.get(Constants.username)) && isNotNullOrUndefined(this.storage.get(Constants.oauthTokenName));
  }

  public logout() {
    this.username = "Login";
    this.storage.clear();
    this.userLoggedIn = undefined;
  }

}
