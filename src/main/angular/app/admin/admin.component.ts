import {Component, OnInit} from '@angular/core';
import {User} from "../rest/response/User";
import {UserService} from "../services/user.service";
import {SnackbarService} from "../services/snackbar.service";
import {BehaviorSubject} from "rxjs";
import {Constants} from "../constants/Constants";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  UserRoles: string[] = Constants.getRoles();
  constructor(private userService: UserService, private snackBarService: SnackbarService) {
    this.getAllRoles();
    this.getAllUsers();
  }

  ngOnInit(): void {
  }

  getAllUsers(){
    this.userService.getAllUsers().then(data => {
      this.users = data;
      console.log(data);
    });
  }

  getAllRoles() {
    this.userService.getAllUserRoles().then(data => {
      this.UserRoles = data;
    });
  }

  updateRole(user: User, role: string) {
    let found = false;
    if(user.roles.indexOf(role) >= 0) {
      user.roles.splice(user.roles.indexOf(role), 1);
    } else {
      user.roles.splice(user.roles.length, 0, role);
    }
  }

  containsRole(user: User, role: string) {
    console.log(user.username + " " + role + " " + (user.roles.indexOf(role) >= 0));
   return new BehaviorSubject(user.roles.indexOf(role) >= 0);
  }

  save() {
    this.userService.updateUsers(this.users).then((response) => {
      this.snackBarService.displayMessage("successfully updated users", 10000);
    }).catch((response) =>{
      this.snackBarService.displayMessage(response, 10000);
    })
  }
}
