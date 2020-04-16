import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ModelService} from "../../../services/model.service";
import {Model} from "../../../rest/response/Model";
import {MatPaginator} from "@angular/material/paginator";

class ModelSearchField {
  public static MODEL_NAME: string = "MODEL_NAME";
  public static TAG_NAME: string = "TAG_NAME"
}

@Component({
  selector: 'app-print-search',
  templateUrl: './print-search.component.html',
  styleUrls: ['./print-search.component.css']
})
export class PrintSearchComponent implements OnInit, AfterViewInit {
  searchData: Array<Model>;
  totalRows: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  searchModelForm: FormGroup = new FormGroup({
    modelSearch: new FormControl(this.modelSearch, []),
    tagSearch: new FormControl(this.tagSearch, [])
  });
  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.searchModel(0, 20)
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(this.paginatorSearch());
    this.modelService.uploadEmitter.subscribe(this.paginatorSearch())
  }

  paginatorSearch() {
    this.modelService.searchModel(this.modelSearch.value,  [], ModelSearchField.MODEL_NAME, true, this.paginator.pageIndex, this.paginator.pageSize);
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

  searchModel(page: number, pageSize: number) {
    let array = new Array<string>();
    JSON.stringify(this.tagSearch.value).split(",").forEach((tag) => {
      if(tag !== "null") {
        array.push(tag);
      } else {
        array.push("");
      }
    });
    this.modelService.searchModel(this.modelSearch.value, array, ModelSearchField.MODEL_NAME,  true, page, pageSize)
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
