import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {HasRole} from "../../../interfaces/HasRole";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss']
})
export class DndComponent implements OnInit, HasRole{

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  hasRole(role: string): BehaviorSubject<boolean> {
    return this.userService.hasRole(role);
  }


}
