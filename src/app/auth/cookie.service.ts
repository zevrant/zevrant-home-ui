import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  document: Document = DOCUMENT.ngInjectableDef;

  constructor() {}

  setCookie(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  getCookie(key: string) {
    localStorage.getItem(key);
  } 

}
