import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-prints',
  templateUrl: './prints.component.html',
  styleUrls: ['./prints.component.css']
})
export class PrintsComponent implements OnInit {

  printUploadEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.printUploadEvent.emit("search");
  }

}
