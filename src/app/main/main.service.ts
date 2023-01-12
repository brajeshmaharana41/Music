import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/common/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandlerService } from '../shared/services/httphandler.service';
import { Constants } from '../shared/common/constant';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private _httpClient$: HttpHandlerService) {}

  getDashboard(): Observable<any> {
    return this._httpClient$.get(API.Dashboard.home);
  }

  updateProfile(signUpForm: FormData) {
    return this._httpClient$.post(API.User.profileUpdate, signUpForm, {
      Authorization: `Bearer ${localStorage.getItem(
        Constants.SESSIONTOKENSTRING
      )}`,
    });
  }
}
