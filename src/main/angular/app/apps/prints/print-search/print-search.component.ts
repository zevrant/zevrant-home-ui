import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ModelService} from "../../../services/model.service";
import {Model} from "../../../rest/response/Model";
import {MatPaginator} from "@angular/material/paginator";
import {Constants} from "../../../constants/Constants";
import {PrintsComponent} from "../prints.component";
import {SnackbarService} from "../../../services/snackbar.service";

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
  constructor(private modelService: ModelService, private snackBarService: SnackbarService) { }

  ngOnInit() {
    this.searchModel(0, 20);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event) => this.paginatorSearch());
    this.modelService.uploadEmitter.subscribe((event) => this.paginatorSearch())
  }

  paginatorSearch() {
    this.searchModel(this.paginator.pageIndex, this.paginator.pageSize);
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
    let array = this.modelService.convertTagString(this.tagSearch.value);
    let modelName: string = this.modelSearch.value;
    if(modelName === "") {
      modelName = null;
    }
    this.modelService.searchModel(modelName, array, ModelSearchField.MODEL_NAME,  true, page, pageSize)
      .then((data) => {
      data.models.forEach((model) => {
        let fileName = model.fileName.split("/");
        let fileBreakup = fileName[fileName.length - 1].split(".");
        model.fileName =  fileBreakup[0];
        model.fileExtension = fileBreakup[fileBreakup.length -1]
      });
      this.searchData = data.models;
      this.totalRows = data.totalRows;
        console.log(this.searchData);
    }).catch((err) => {
      this.snackBarService.displayMessage(err.error.message, 10000);
    })
  }

  async getCoverPhoto(model: Model) {
    if(model.coverPhoto === null) {
      let blob: ArrayBuffer = await this.modelService.getCoverPhoto(model.fileName + `.${model.fileExtension}`);
      let array = new Uint8Array(blob);
      model.coverPhoto = String.fromCharCode.apply(null, array);;
    }
  }

  async download(currentModel: Model) {
    let element = document.getElementById("test");
    element.setAttribute('href', `${Constants.baseUrl}zuul/zevrant-model-service/models/${currentModel.fileName}.${currentModel.fileExtension}`);
    element.setAttribute('download', currentModel.fileName + ".zip");
    element.setAttribute("type", "application/octet-stream");
    element.click()
  }


}
