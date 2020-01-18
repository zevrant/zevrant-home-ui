import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {regexValidator} from "../../directives/regex-validator.directive";
import {LoginService} from "../service/login.service";
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";
import {Constants} from "../../constants/Constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
      Validators.minLength(3),
      regexValidator(/([a-z][A-Z])+/)
    ]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.minLength(12),
      regexValidator(/([!@#$%^&*()\[\]:;,.\/<>?'"|])+/)
    ])
  });

  constructor(private loginService: LoginService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.username.value, this.password.value)
      .subscribe((data: any) => {
            this.storage.set(Constants.oauthTokenName, data.access_token)
      });
  }

  get username(): AbstractControl {
    if(this.loginForm){
      return this.loginForm.get('username') ;
    }
    return null;
  }

  get password(): AbstractControl {
    if(this.loginForm) {
      return this.loginForm.get('password');
    }
    return null;
  }

}
