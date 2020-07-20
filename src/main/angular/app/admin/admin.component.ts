import {Component, OnInit} from '@angular/core';
import {User} from "../rest/response/User";
import {UserService} from "../services/user.service";
import {SnackbarService} from "../services/snackbar.service";
import {BehaviorSubject} from "rxjs";
import {Constants} from "../constants/Constants";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {regexValidator} from "../directives/regex-validator.directive";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: User[];
  userRoles: string[] = Constants.getRoles();
  addRolesForm: FormGroup = new FormGroup({
    addRole: new FormControl(this.addRole, [
      Validators.required,
    ]),
    roleDesc: new FormControl(this.roleDesc, [
      Validators.required
    ])
  });
  totalRows: any;
  displayedColumns: any;
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
      this.userRoles = data;
      this.displayedColumns = ["Username"];
      data.forEach((role) => {
        this.displayedColumns.push(role);
      })
      this.displayedColumns.push("Delete User");
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

  onSubmit() {
    let tag = this.addRole.value
    let desc = this.roleDesc.value
    this.userService.addRole(tag, desc);
  }

  get addRole(): AbstractControl {
    if(this.addRolesForm){
      return this.addRolesForm.get('addRole');
    }
    return null;
  }

  get roleDesc(): AbstractControl {
    if(this.addRolesForm){
      return this.addRolesForm.get('roleDesc');
    }
    return null;
  }

  roleSearch(number: number, number2: number) {

  }

  deleteUser() {

  }
}
