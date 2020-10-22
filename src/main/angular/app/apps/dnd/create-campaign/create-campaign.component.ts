import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as momentTimezone from "moment-timezone"
import {Timezone} from "./Timezone";
import {DndService} from "../../../services/dnd.service";
import {error} from "@angular/compiler/src/util";
import {SnackbarService} from "../../../services/snackbar.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  timezones: Array<Timezone> = [];

  createCampaignForm: FormGroup =  new FormGroup({
    campaignName: new FormControl(this.campaignName, [
      Validators.required
    ]),
    ruleset: new FormControl(this.ruleset, [
      Validators.required
    ]),
    frequency: new FormControl(this.frequency, [
      Validators.required
    ]),
    startDate: new FormControl(this.startDate, [
      Validators.required
    ]),
    startTime: new FormControl(this.startTime, [
      Validators.required
    ]),
    timezoneControl: new FormControl(this.timezoneControl, [
      Validators.required
    ])
  });

  constructor(private dndService: DndService, private snackbarService: SnackbarService, private router: Router) {
    let timezones = momentTimezone.tz.names()
    timezones.forEach((timezone) => {
      let zone: Timezone = new Timezone(timezone,momentTimezone().tz(timezone).utcOffset() / 60)
      this.timezones.push(zone);
    });
    this.timezones.sort((a, b) => a.offset > b.offset ? 1 : a.offset < b.offset? -1 : 0)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let offset = momentTimezone().tz(this.timezoneControl.value.timezoneName).utcOffset() / 60
    this.dndService.createCampaign(this.campaignName.value, this.ruleset.value, this.frequency.value, this.startDate.value, this.startTime.value.toString(), offset).then(async (response) => {
      this.dndService.sessionListEmitter.emit("updated");
      await this.router.navigateByUrl("/dnd/campaign/" + encodeURI(this.campaignName.value));
    }).catch((error)=> {
      this.snackbarService.displayMessage(error.error.message, 10000);
    });
  }

  get campaignName() {
    if(this.createCampaignForm){
      return this.createCampaignForm.get('campaignName') ;
    }
    return null;
  }

  get ruleset() {
    if(this.createCampaignForm){
      return this.createCampaignForm.get('ruleset') ;
    }
    return null;
  }

  get frequency() {
    if(this.createCampaignForm){
      return this.createCampaignForm.get('frequency') ;
    }
    return null;
  }

  get startDate() {
    if(this.createCampaignForm){
      return this.createCampaignForm.get('startDate') ;
    }
    return null;
  }

  get startTime() {
    if(this.createCampaignForm){
      return this.createCampaignForm.get('startTime') ;
    }
    return null;
  }

  get timezoneControl() {
    if(this.createCampaignForm){
      return this.createCampaignForm.get('timezoneControl') ;
    }
    return null;
  }

}
