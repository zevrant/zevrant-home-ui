import {Component, OnChanges, OnInit} from '@angular/core';
import {PrintService} from "../../../services/print.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpService} from "../../../services/http.service";
import {Constants} from "../../../constants/Constants";
import {ModelService} from "../../../services/model.service";
import {TagService} from "../../../services/tag.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {PrintsComponent} from "../prints.component";

@Component({
  selector: 'app-print-upload',
  templateUrl: './print-upload.component.html',
  styleUrls: ['./print-upload.component.css']
})
export class PrintUploadComponent implements OnInit, OnChanges {
  files: File;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  fileSize;
  isLoading: Observable<boolean> = this.loadingSubject.asObservable();
  private fileData: ArrayBuffer;
  filesTouched: boolean = false;
  private coverPhotos: File;
  photo;
  tags;
  displayedColumns: string[] = ["tag", "checkbox"];
  private appliedTags: string[] = [];
  searchTagForm: FormGroup = new FormGroup({
    tagSearch: new FormControl(this.tagSearch, [
    ])
  });

  constructor(private http: HttpService, private printService: PrintService, private snackBar: MatSnackBar,
              private modelService: ModelService, private tagService: TagService, private printsComponent: PrintsComponent) {
    this.getTags(0, 5);
  }

  ngOnChanges() {
    this.searchTag()
  }

  ngOnInit() {
  }

  isValid() {
    return this.files && this.coverPhotos
  }

  submit() {
    this.loadingSubject.next(true);
    this.modelService.uploadModel(this.fileData, this.files.name, this.photo, this.appliedTags).then((data) => {
      this.files = null;
      this.filesTouched = false;
      this.coverPhotos = null;
      this.photo = null;
      this.fileSize = null;
      this.snackBar.open("Upload Successful!")
      this.dismiss();
      this.printsComponent.printUploadEvent.emit("uploaded");
    }).catch((err: any) => {
      this.snackBar.open(err.error.message);
      this.dismiss();
    }).finally(()=>{
      this.loadingSubject.next(false);
    });

  }

  dismiss() {
    new Promise( resolve => setTimeout(resolve, 10000) ).then(() => {
      this.snackBar.dismiss();
    });
  }

  fileUploadEvent($event) {
    this.files = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsArrayBuffer(this.files);
    reader.onload = (event) => {
      this.fileData = <ArrayBuffer>reader.result;
    };
    this.fileSize = this.files.size / 1024;
    this.filesTouched = true;
  }

  fileCoverPhotoUploadEvent($event) {
    this.coverPhotos = <File>$event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(this.coverPhotos);
    reader.onload = (event) => {
      this.photo = <ArrayBuffer>reader.result;
    };
  }

  async getTags(page: number, pageSize: number) {
    let tags = await this.http.get(Constants.modelBaseUrl + `tags/${page}/${pageSize}`, null);
    this.tags = tags.tags;
  }

  applyTag(tag: string) {
    let index: number = this.appliedTags.indexOf(tag);
    if (index > -1) {
      this.appliedTags = this.appliedTags.splice(index, 1);
      return;
    }
    this.appliedTags.push(tag);
  }

  async searchTag() {
    let temp: any =  await this.tagService.searchTag(this.tagSearch.value);
    this.tags =temp.tags;
  }

  get tagSearch(): AbstractControl {
    if(this.searchTagForm){
      return this.searchTagForm.get('tagSearch') ;
    }
    return null;
  }

  async addTag() {
    this.tagService.uploadTag(this.tagSearch.value).then(() => {
      this.searchTag();
    });
  }
}
