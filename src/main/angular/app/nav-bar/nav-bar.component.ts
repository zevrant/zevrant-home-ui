import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {Constants} from "../constants/Constants";
import {HttpClient} from "@angular/common/http";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private baseUrl: string;
  // private isLoggedIn: string = "/oauth/"
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http:HttpClient, private platformLocation: PlatformLocation) {
    this.baseUrl = Constants.baseUrl;
  }

  ngOnInit() {
  }

  isLoggedIn() {
    let isLoggedIn = isNotNullOrUndefined(this.storage.get(Constants.oauthTokenName));
    if(!isLoggedIn){
      return isLoggedIn
    }
    let username = this.storage.get(Constants.username);

    // this.http.get()
  }

}
