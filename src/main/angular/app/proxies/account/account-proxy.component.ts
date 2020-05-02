import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "angular-web-storage";
import {Constants} from "../../constants/Constants";
import {User} from "../../rest/response/User";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-account-proxy',
  templateUrl: './account-proxy.component.html',
  styleUrls: ['./account-proxy.component.css']
})
export class AccountProxyComponent implements OnInit {
  focus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: User = new User(null, null, null);
  userUpdateForm: FormGroup = new FormGroup({
    username: new FormControl(this.username, [])
  });

  constructor(private userService: UserService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.userService.getUserByName(this.storage.get(Constants.username)).then((data) => {
       this.user = data;
       this.username.setValue(data.username);
    })
  }

  async onFocus() {
    this.focus.next(true);
  }

  async onFoucusout() {
    this.user.username = this.username.value
    this.focus.next(false);
  }

  get username(): AbstractControl {
    if(this.userUpdateForm){
      return this.userUpdateForm.get('username') ;
    }
    return null;
  }

  updateUsername() {

  }
}
