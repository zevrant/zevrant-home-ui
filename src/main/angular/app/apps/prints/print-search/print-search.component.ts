import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ModelService} from "../../../services/model.service";
import {Model} from "../../../rest/response/Model";

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
  searchData: Array<Model>;
  totalRows: number;
  searchModelForm: FormGroup = new FormGroup({
    modelSearch: new FormControl(this.modelSearch, []),
    tagSearch: new FormControl(this.tagSearch, [])
  });
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
        model.fileName =  fileName[fileName.length - 1].split(".")[0];
      });
      this.searchData = data.models;
      this.totalRows = data.models.length;
        console.log(this.searchData);
    })
  }

  async getCoverPhoto(model: Model) {
    if(model.coverPhoto === null) {
      let blob: ArrayBuffer = await this.modelService.getCoverPhoto(model.fileName + ".zip");
      let array = new Uint8Array(blob);
      const STRING_CHAR = String.fromCharCode.apply(null, array);

      model.coverPhoto = STRING_CHAR;
    }
  }

  async download(currentModel: Model) {
    let element = document.getElementById("test");
    element.setAttribute('href', `http://localhost:7644/zevrant-home-ui/zuul/zevrant-model-service/models/${currentModel.fileName}.zip`);
    element.setAttribute('download', currentModel.fileName + ".zip");
    element.setAttribute("type", "application/octet-stream");
    element.click()
  }
}
