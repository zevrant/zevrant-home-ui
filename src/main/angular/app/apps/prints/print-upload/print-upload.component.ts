import {Component, OnChanges, OnInit} from '@angular/core';
import {PrintService} from "../../../services/print.service";
import {MatSnackBar} from '@angular/material';
import {HttpService} from "../../../services/http.service";
import {Constants} from "../../../constants/Constants";
import {ModelService} from "../../../services/model.service";
import {TagService} from "../../../services/tag.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-print-upload',
  templateUrl: './print-upload.component.html',
  styleUrls: ['./print-upload.component.css']
})
export class PrintUploadComponent implements OnInit, OnChanges {
  private files: File;
  private fileSize;
  private fileData: ArrayBuffer;
  private filesTouched: boolean = false;
  private coverPhotos: File;
  private photo;
  private tags;
  private displayedColumns: string[] = ["tag", "checkbox"];
  private appliedTags: string[] = [];
  private searchTagForm: FormGroup = new FormGroup({
    tagSearch: new FormControl(this.tagSearch, [
    ])
  });

  constructor(private http: HttpService, private printService: PrintService, private snackBar: MatSnackBar,
              private modelService: ModelService, private tagService: TagService) {
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

  async onSubmit() {
    this.modelService.uploadModel(this.fileData, this.files.name, this.photo, this.appliedTags).then((data) => {
      this.files = null;
      this.filesTouched = false;
      this.coverPhotos = null;
      this.photo = null;
      this.fileSize = null;
      this.snackBar.open("Upload Successful!")
      this.dismiss();
    }).catch((err: any) => {
      this.snackBar.open(err.error.message);
      this.dismiss();
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
    reader.readAsDataURL(this.files);
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
