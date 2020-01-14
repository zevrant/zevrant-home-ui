import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../constants/Constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    fullName: new FormControl('')
  });

  private http: HttpClient;
  private config;
  constructor(http: HttpClient) {
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
    }
    this.http.post("zevrant-oauth2-service/email", message)
      .subscribe((data: any) => {
        this.config = data;
      });
  }
}
