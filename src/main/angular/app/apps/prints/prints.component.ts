import {Component, OnInit} from '@angular/core';
import {Constants} from "../../constants/Constants";

@Component({
  selector: 'app-prints',
  templateUrl: './prints.component.html',
  styleUrls: ['./prints.component.css']
})
export class PrintsComponent implements OnInit {
  roles: string[] = [];

  constructor() { }

  ngOnInit() {
    this.roles = Constants.getRoles();
  }

}
