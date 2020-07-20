import {AfterViewInit, Component, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ModelService} from "../../../services/model.service";
import {Model} from "../../../rest/response/Model";
import {MatPaginator} from "@angular/material/paginator";
import {Constants} from "../../../constants/Constants";
import {SnackbarService} from "../../../services/snackbar.service";
import {BehaviorSubject} from "rxjs";
import {ThingiverseService} from "../../../services/thingiverse.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ThingiverseHit} from "../../../rest/response/ThingiverseHit";
import {ThingiverseTag} from "../../../rest/response/ThingiverseTag";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {CultsService} from "../../../services/cults.service";

class ModelSearchField {
  public static MODEL_NAME: string = "MODEL_NAME";
  public static TAG_NAME: string = "TAG_NAME"
}

@Component({
  selector: 'app-print-search',
  templateUrl: './print-search.component.html',
  styleUrls: ['./print-search.component.scss']
})
export class PrintSearchComponent implements OnInit, AfterViewInit {
  searchData: Array<Model>;
  totalRows: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  searchModelForm: FormGroup = new FormGroup({
    modelSearch: new FormControl(this.modelSearch, []),
    tagSearch: new FormControl(this.tagSearch, []),
    source: new FormControl(this.source, [])
  });
  private sources = ["Thingverse", "Cults"];
  thingverseLogin;
  private assetToken: string;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private modelService: ModelService, private snackBarService: SnackbarService,
              private thingiverseService: ThingiverseService, private cultsService: CultsService) { }

  ngOnInit() {
    this.searchModel(0, 20);
    // this.assetToken = this.router.
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event) => this.paginatorSearch());
    this.modelService.uploadEmitter.subscribe((event) => this.paginatorSearch())
  }

  async paginatorSearch() {
    this.isLoading.next(true);
    await this.searchModel(this.paginator.pageIndex, this.paginator.pageSize);
    this.isLoading.next(false);
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

  get source(): AbstractControl {
    if(this.searchModelForm){
      return this.searchModelForm.get('source') ;
    }
    return null;
  }

  async searchModel(page: number, pageSize: number) {
    let array = this.modelService.convertTagString(this.tagSearch.value);
    let modelName: string = this.modelSearch.value;
    if(modelName === "") {
      modelName = null;
    }
    switch (this.source.value) {
      case "Thingiverse": {
        return this.thingiverseSearch(page, pageSize);
      }
      case "Cults": {
        return this.cultsSearch(page);
      }
    }
    await this.modelService.searchModel(modelName, array, ModelSearchField.MODEL_NAME,  true, page, pageSize)
      .then((data) => {
      data.models.forEach((model) => {
        let fileName = model.fileName.split("/");
        let fileBreakup = fileName[fileName.length - 1].split(".");
        model.fileName =  fileBreakup[0];
        model.fileExtension = fileBreakup[fileBreakup.length -1];
        model.isTagsSelected = new BehaviorSubject<boolean>(false);
        this.searchModelForm.addControl(model.fileName, new FormControl())
      });
      this.searchData = data.models;
      this.totalRows = data.totalRows;
    }).catch((err) => {
      this.snackBarService.displayMessage(err.error.message, 10000);
    })
  }

  async getCoverPhoto(model: Model) {
    if (this.source.value === "Thingiverse" || this.source.value === "Cults") {
      return model.coverPhoto;
    }
    if(model.coverPhoto === null) {
      let blob: ArrayBuffer = await this.modelService.getCoverPhoto(model.fileName + `.${model.fileExtension}`);
      let array = new Uint8Array(blob);
      model.coverPhoto = String.fromCharCode.apply(null, array);
    }
  }

  async download(currentModel: Model) {
    let element = document.getElementById("test");
    if(this.sources.indexOf(this.source.value) >= 0){
      // element.setAttribute('href', `${Constants.outsourceBaseUrl}/thingiverse/download/${currentModel.id}`);
      window.location.href = currentModel.url;
    } else {
      element.setAttribute('href', `${Constants.baseUrl}zuul/zevrant-model-service/models/${currentModel.fileName}.${currentModel.fileExtension}`);
    }
    element.setAttribute('download', currentModel.fileName + ".zip");
    element.setAttribute("type", "application/octet-stream");
    element.click()
  }

  updateTags(model: Model) {
    this.modelService.updateTags(model.fileName, model.tags);
  }

  async thingiverseSearch(page :number, pageSize: number) {
    let searchValue: string = this.modelSearch.value;
    if(searchValue === null || searchValue === "") {
      searchValue = ' ';
    }
    await this.thingiverseService.search(searchValue, page + 1, pageSize).then((data) => {
      this.searchData = [];
      data.hits.forEach((dataPoint) => {
        this.totalRows = data.total;
        let tags: Array<string> = [];
        for(let j = 0; j < dataPoint.tags.length; j++){
          tags.push(dataPoint.tags[j].name);
        }
        let model: Model = new Model(dataPoint.name, dataPoint.thumbnail, null, tags) ;
        model.url = dataPoint.public_url;
        this.searchData.push(model);
        this.searchModelForm.addControl(model.fileName, new FormControl())
      });
    })
  }

  async cultsSearch(page: number) {
    let searchValue: string = this.modelSearch.value;
    if(searchValue === null || searchValue === "") {
      searchValue = ' ';
    }

    await this.cultsService.searchModel(searchValue, page + 1).then(data => {
      this.searchData = data.models;
      this.totalRows = data.totalRows;
      this.searchData.forEach((model)=> this.searchModelForm.addControl(model.fileName, new FormControl()))
    }).catch(() => {
      this.snackBarService.displayMessage("We are currently processing your request try again in a few minutes.", 10000);
    }).finally(() => {
      this.isLoading.next(false);
    });
  }

}
