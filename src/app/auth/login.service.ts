import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CookieService } from './cookie.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  isLoggedIn(): boolean {
    const isLoggedIn = this.cookieService.getCookie('authToken')
    var expiration: any = this.cookieService.getCookie('expiration')
    if (expiration != null) {
      expiration = new Date(expiration)
      return isLoggedIn != null && new Date().getTime() < expiration.getTime();
    }

    return false;
  }


}
