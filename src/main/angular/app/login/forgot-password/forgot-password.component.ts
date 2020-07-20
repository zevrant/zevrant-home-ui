import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {BehaviorSubject} from "rxjs";
import {Tag} from "../../apps/prints/print-upload/tag";
import {UserService} from "../../services/user.service";
import {Role} from "../../rest/response/Role";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  resetPassword:FormGroup = new FormGroup({
    email: new FormControl(this.email, [
      Validators.required,
    ]),
  });

  constructor(private loginService: LoginService, private router: Router, private snackBarService: SnackbarService) { }

  ngOnInit(): void {

  }

  get email(): AbstractControl {
    if(this.resetPassword) {
      return this.resetPassword.get('email');
    }
    return null;
  }

  onSubmit() {
    this.loginService.forgotPassword(this.email.value).then(()=> {
      this.snackBarService.displayMessage("Password reset link sent to " + this.email.value, 10000);
      this.router.navigateByUrl('');
    })
  }


}
