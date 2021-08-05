import {Component, OnInit} from '@angular/core';
import {User} from "../rest/response/User";
import {UserService} from "../services/user.service";
import {SnackbarService} from "../services/snackbar.service";
import {BehaviorSubject} from "rxjs";
import {Constants} from "../constants/Constants";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "angular-web-storage";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    users: User[];
    userRoles: string[];
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

    constructor(private userService: UserService, private snackBarService: SnackbarService,
                private localStorageService: LocalStorageService) {
        this.init().then(() => {
          console.debug("admin data loaded")
        })
    }

    async init(): Promise<any> {
      await this.getAllRoles();
      console.log("here")
      await this.getAllUsers();
    }

    get addRole(): AbstractControl {
        if (this.addRolesForm) {
            return this.addRolesForm.get('addRole');
        }
        return null;
    }

    get roleDesc(): AbstractControl {
        if (this.addRolesForm) {
            return this.addRolesForm.get('roleDesc');
        }
        return null;
    }

    ngOnInit(): void {
    }

    async getAllUsers() {
        let test = await this.userService.getAllUsers();
        console.log(test)
        this.users = test
    }

    updateRole(user: User, role: string) {
        let found = false;
        if (user.roles.indexOf(role) >= 0) {
            user.roles.splice(user.roles.indexOf(role), 1);
        } else {
            user.roles.splice(user.roles.length, 0, role);
        }
    }

    containsRole(user: User, role: string) {
        return new BehaviorSubject(user.roles.indexOf(role) >= 0);
    }

    save() {
        this.userService.updateUsers(this.users).then((response) => {
            this.userService.getRoles(this.localStorageService.get(Constants.username));
            this.snackBarService.displayMessage("successfully updated users", 10000);
        }).catch((response) => {
            this.snackBarService.displayMessage(response, 10000);
        })
    }

    async onSubmit() {
        let tag = this.addRole.value
        let desc = this.roleDesc.value
      try {
          console.log("here")
        await this.userService.addRole(tag, desc);
      } catch (error) {
          console.error(error)
      }
        await this.init()
    }

    roleSearch(number: number, number2: number) {

    }

    deleteUser() {

    }

    private async getAllRoles() {
        await this.userService.getAllUserRoles();
        let data = Object.keys(this.userService.roles);
        this.userRoles = data;
        this.displayedColumns = ["Username"];
        data.forEach((role) => {
            this.displayedColumns.push(role);
        });
        this.displayedColumns.push("Delete User");
    }
}
