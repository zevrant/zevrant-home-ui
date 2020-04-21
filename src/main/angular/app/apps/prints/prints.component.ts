import {Component, EventEmitter, OnInit} from '@angular/core';
import {ModelService} from "../../services/model.service";

@Component({
  selector: 'app-prints',
  templateUrl: './prints.component.html',
  styleUrls: ['./prints.component.css']
})
export class PrintsComponent implements OnInit {


  constructor(private modelService: ModelService) { }

  ngOnInit() {
  }

  onSearch() {
    this.modelService.uploadEmitter.emit("search");
  }

}
