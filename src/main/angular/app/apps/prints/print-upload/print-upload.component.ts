import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-print-upload',
  templateUrl: './print-upload.component.html',
  styleUrls: ['./print-upload.component.css']
})
export class PrintUploadComponent implements OnInit {
  uploadForm: FormGroup = new FormGroup({
    username: new FormControl(this.fileUpload, [
     Validators.required,
    ])
});

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {

  }

  get fileUpload(): AbstractControl{
    if (this.uploadForm) {
      return this.uploadForm.get("fileUpload");
    }
    return new FormControl();
  }
}
