import {Component, OnInit} from '@angular/core';
import {PrintService} from "../../../services/print.service";
import {MatSnackBar} from '@angular/material';
import {HttpService} from "../../../services/http.service";
import {Constants} from "../../../constants/Constants";
import {ModelService} from "../../../services/model.service";
import {TagService} from "../../../services/tag.service";

@Component({
  selector: 'app-print-upload',
  templateUrl: './print-upload.component.html',
  styleUrls: ['./print-upload.component.css']
})
export class PrintUploadComponent implements OnInit {
  private files: File;
  private fileData: ArrayBuffer;
  private filesTouched: boolean = false;
  private coverPhotos: File;
  private photo;
  private tags;
  private displayedColumns: string[] = ["tag", "checkbox"];
  private appliedTags: string[] = [];

  // @ViewChild("searchField", null) searchField: ElementRef;

  constructor(private http: HttpService, private printService: PrintService, private snackBar: MatSnackBar,
              private modelService: ModelService, private tagService: TagService) {
    this.getTags(0, 5);
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
      this.snackBar.open("Upload Successful!")
      new Promise( resolve => setTimeout(resolve, 6000) ).then(() => {
        this.snackBar.dismiss();
      });
    });

  }

  fileUploadEvent($event) {
    this.files = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(this.files);
    reader.onload = (event) => {
      this.fileData = <ArrayBuffer>reader.result;
    };
    this.filesTouched = true;
  }

  fileCoverPhotoUploadEvent($event) {
    this.coverPhotos = <File>$event.target.files[0];
    console.log(this.coverPhotos);
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(this.coverPhotos);
    reader.onload = (event) => {
      this.photo = <ArrayBuffer>reader.result;
    };
  }

  async getTags(page: number, pageSize: number) {
    let tags = await this.http.get(Constants.modelBaseUrl + `tags/${page}/${pageSize}`, null);
    this.tags = tags.tags;
    console.log(this.tags);
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

    // this.tags = await this.tagService.searchTag(this.searchField.nativeElement.);
  }
}
