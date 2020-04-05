import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpService) {

  }

  async searchTag(tag: string) {
    return await this.http.get(Constants.modelBaseUrl + `tag/${tag}/1/5`, null);
  }

}
