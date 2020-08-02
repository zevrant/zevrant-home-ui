import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {HasRole} from "../../../interfaces/HasRole";
import {BehaviorSubject} from "rxjs";
import {DndService} from "../../services/dnd.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss']
})
export class DndComponent implements OnInit, HasRole{

  campaigns: Array<string>;
  constructor(private userService: UserService, private dndService: DndService, private snackbarService: SnackbarService,
              private router: Router) { }

  ngOnInit(): void {
    this.getNames();
    this.dndService.sessionListEmitter.subscribe(() => {
      this.getNames();
    })
  }

  hasRole(role: string): BehaviorSubject<boolean> {
    return this.userService.hasRole(role);
  }

  public hasCurrentPath(badPath: string): boolean {
    return badPath.indexOf(this.router.url) >= 0;
  }

  private getNames(): void {
    this.dndService.getCampaignNames().then((data)=> {
      this.campaigns = data;
    }).catch((error: any) => {
      this.snackbarService.displayMessage(error.error, 10000);
    })
  }

}
