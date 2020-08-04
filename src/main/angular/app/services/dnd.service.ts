import {EventEmitter, Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Time} from "@angular/common";
import {CreateCampaignRequest} from "../rest/request/CreateCampaignRequest";
import {Constants} from "../constants/Constants";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Injectable({
  providedIn: 'root'
})
export class DndService {

  private _sessionListEmitter: EventEmitter<string> = new EventEmitter<string>()

  constructor(private http: HttpService) {
  }

  public createCampaign(campaignName: string, ruleset: string, frequency: string,
                        startDate: string, startTime: string, offset: number): Promise<any> {
    let campaignRequest: CreateCampaignRequest = new CreateCampaignRequest(campaignName, ruleset, frequency,
                                                                            startDate, startTime, offset);
    return this.http.post(Constants.dndBaseUrl + "campaigns", null, campaignRequest);
  }

  public getProgress(uuid: string): Promise<any> {
    return this.http.get(Constants.dndBaseUrl + `sessions/progress/${uuid}`, null);
  }

  get sessionListEmitter(): EventEmitter<string> {
    return this._sessionListEmitter;
  }

  public getCampaignNames(): Promise<Array<string>> {
    return this.http.get(Constants.dndBaseUrl + "campaigns/names", null);
  }

  public uploadSession(sessionName: string, campaignName: string, sessionNotesLink: string, recording: ArrayBuffer, sessionNumber: number) {
    let formData: FormData = new FormData();
    formData.append("file", new Blob([recording]), 'file');
    formData.append("sessionName", sessionName);
    formData.append("campaignName", campaignName);
    formData.append("sessionNotesLink", sessionNotesLink)
    if(isNotNullOrUndefined(sessionNumber)) {
      formData.append("sessionNumber", "" + sessionNumber)
    }
    return this.http.post(Constants.dndBaseUrl + "sessions", null, formData);
  }

  public deleteProgress(uuid:string): Promise<any> {
    return this.http.delete(Constants.dndBaseUrl + `sessions/progress/${uuid}`, null);
  }
}
