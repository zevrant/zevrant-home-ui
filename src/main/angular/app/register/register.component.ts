import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../constants/Constants";
import {regexValidator} from "../directives/regex-validator.directive";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
      Validators.minLength(3),
      regexValidator(/([a-z][A-Z])+/)
    ]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.minLength(12),
      regexValidator(/([!@#$%^&*()\[\]:;,.\/<>?'"|])+/)
    ]),
    fullName: new FormControl(this.fullName, [
      Validators.required,
      Validators.minLength(6),
      regexValidator(/([a-z][A-Z])+ ([a-z][A-Z])+/)
    ])
  });

  private http: HttpClient;
  private config;
  constructor(http: HttpClient, private router: Router) {
    this.http=http;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.registerForm);
    let message = {
      "username": this.registerForm.get("username").value,
      "password": this.registerForm.get("password").value,
      "fullName": this.registerForm.get("fullName").value
    };
    this.http.post("zevrant-oauth2-service/email", message)
      .subscribe((data: any) => {
        this.config = data;
        this.router.navigateByUrl("");
      });
  }

  get username(): AbstractControl {
    if(this.registerForm){
      return this.registerForm.get('username');
    }
    return null;
  }

  get password(): AbstractControl  {
    if(this.registerForm){
      return this.registerForm.get('password');
    }
    return null;
  }

  get fullName(): AbstractControl {
    if(this.registerForm){
      return this.registerForm.get('fullName');
    }
    return null;
  }
}
