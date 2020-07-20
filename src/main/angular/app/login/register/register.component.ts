import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {regexValidator} from "../../directives/regex-validator.directive";
import {Router} from "@angular/router";
import {Role} from "../../rest/response/Role";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
      Validators.minLength(3),
      regexValidator(/([a-z][A-Z])+/)
    ]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.minLength(10),
    ]),
    fullName: new FormControl(this.fullName, [
      Validators.required,
      Validators.minLength(6),
      regexValidator(/([a-z][A-Z])+ ([a-z][A-Z])+/)
    ])
  });

  private config;

  userRoles = new BehaviorSubject<Array<Role>>([]);
  displayedColumns = ["Desired Role", "Is Applied"];
  private appliedRoles: string[] = [];

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {

  }

  async ngOnInit() {
    this.userService.getAllRoles().then(data => {
      let dataRoles: Array<Role> = [];
      for(let role in data) {
        dataRoles.push(new Role(data[role], false));
      }
      this.userRoles.next(dataRoles);
    });
  }

  onSubmit() {
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

  applyRole(role: Role) {
    let index: number = this.appliedRoles.indexOf(role.role);
    if (index > -1) {
      this.appliedRoles = this.appliedRoles.splice(index, 1);
      role.isApplied = false;
      return;
    }
    this.appliedRoles.push(role.role);
    role.isApplied = true;
  }
}
