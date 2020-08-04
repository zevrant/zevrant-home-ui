import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {DndService} from "../../../services/dnd.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaignName: string;
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  files: File;
  fileSize: number;
  filesTouched: boolean;

  private fileData: ArrayBuffer;
  uploadRecordingForm: FormGroup = new FormGroup({
    sessionName: new FormControl(this.sessionName, [
      Validators.required
    ]),
    sessionNumber: new FormControl(this.sessionNumber, [
    ]),
    sessionNotesLink: new FormControl(this.sessionNotesLink, [
      Validators.required
    ]),

  });
  showProgress: boolean;
  progress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  mode: BehaviorSubject<string> = new BehaviorSubject<string>("query");

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private dndService: DndService,
              private snackbarService: SnackbarService) {
    this.activatedRoute.params.subscribe((params) => {
      this.campaignName = params['name'];
      this.isAdmin.next(this.userService.hasRole(this.campaignName + "-admin").getValue());
    });
  }

  ngOnInit(): void {
  }

  get sessionName(): AbstractControl {
    if(isNotNullOrUndefined(this.uploadRecordingForm)) {
      return this.uploadRecordingForm.get("sessionName");
    }
    return undefined;
  }

  get sessionNumber(): AbstractControl {
    if(isNotNullOrUndefined(this.uploadRecordingForm)) {
      return this.uploadRecordingForm.get("sessionNumber");
    }
    return undefined;
  }

  get sessionNotesLink(): AbstractControl {
    if(isNotNullOrUndefined(this.uploadRecordingForm)) {
      return this.uploadRecordingForm.get("sessionNotesLink");
    }
    return undefined;
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

  submit() {
    this.mode.next("query");
    this.showProgress = true;
    this.dndService.uploadSession(this.sessionName.value, this.campaignName, this.sessionNotesLink.value, this.fileData, this.sessionNumber.value).then((event)=> {
      this.mode.next("determinate");
      let progressEvent = event;
      let interval = setInterval(() => {
        this.dndService.getProgress(event.uuid).then((result) => {
          progressEvent.bytesTransfered = result.bytesTransfered;
          if(progressEvent.bytesTransfered == progressEvent.maxBytes) {
            this.progress.next(100);
            clearInterval(interval)
            this.showProgress = false;
            this.snackbarService.displayMessage("Upload Comeplete.", 10000);
            this.dndService.deleteProgress(progressEvent.uuid);

          } else {
            console.log(progressEvent.bytesTransfered / this.fileData.byteLength * 100);
            this.progress.next(progressEvent.bytesTransfered / this.fileData.byteLength * 100);
          }
        });

      },1000)
    })
  }
}
