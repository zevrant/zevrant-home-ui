import {Component, OnInit} from '@angular/core';
// import {LoginService} from '../auth/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // loginService: LoginService;

  // constructor(loginService: LoginService) {
  //   this.loginService = loginService;
  // }

  ngOnInit() {
  }

  // isLoggedIn() {
  //   return this.loginService.isLoggedIn();
  // }

  // isNotLoggedIn() {
  //   return !this.loginService.isLoggedIn();
  // }

}
