import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ModelService} from "../../../services/model.service";
import {Model} from "../../../rest/response/Model";
import {of} from "rxjs";
import {map} from "rxjs/operators";

class ModelSearchField {
  public static MODEL_NAME: string = "MODEL_NAME";
  public static TAG_NAME: string = "TAG_NAME"
}

@Component({
  selector: 'app-print-search',
  templateUrl: './print-search.component.html',
  styleUrls: ['./print-search.component.css']
})
export class PrintSearchComponent implements OnInit {
  private searchData: Array<Model>;
  private totalRows: number;
  private searchModelForm: FormGroup = new FormGroup({
    modelSearch: new FormControl(this.modelSearch, []),
    tagSearch: new FormControl(this.tagSearch, [])
  });
  displayedColumns: Array<string> = ["Model", "Tags"];
  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.searchModel()
  }

  get tagSearch(): AbstractControl {
    if(this.searchModelForm){
      return this.searchModelForm.get('tagSearch') ;
    }
    return null;
  }

  get modelSearch(): AbstractControl {
    if(this.searchModelForm){
      return this.searchModelForm.get('modelSearch') ;
    }
    return null;
  }

  searchModel() {
    let array = new Array<string>();
    JSON.stringify(this.tagSearch.value).split(",").forEach((tag) => {
      if(tag !== "null") {
        array.push(tag);
      } else {
        array.push("");
      }
    });
    this.modelService.searchModel(this.modelSearch.value, array, ModelSearchField.MODEL_NAME,  true, 0, 20)
      .then((data) => {
      data.models.forEach((model) => {
        let fileName = model.fileName.split("/");
        model.fileName =  fileName[fileName.length - 1];
      });
      this.searchData = data.models;
      this.totalRows = data.models.length;
        console.log(this.searchData);
    })
  }

  getRecord(row: any) {
    console.log(row)
  }

  download() {

  }
}
