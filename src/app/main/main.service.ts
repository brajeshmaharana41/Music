import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/common/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandlerService } from '../shared/services/httphandler.service';
import { Constants } from '../shared/common/constant';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public id: string,
    public parentNode: any,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}

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

  userDetails() {
    return this._httpClient$.get(API.User.userDetails, {
      Authorization: `Bearer ${localStorage.getItem(
        Constants.SESSIONTOKENSTRING
      )}`,
    });
  }

  getCMS() {
    return this._httpClient$.get(API.Admin.cms, {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2YwOGI3YTVkZmE5NmMyY2JkMTVhMiIsInVzZXJfdHlwZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBkaGFrYXJlY29yZC5jb20iLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2NzY5OTQwMzMsImV4cCI6MTY3OTU4NjAzM30.X8isFvM40-QvKXbdnjGLcJ5rtwPmja5ERyrx8lbgs9o`,
    });
  }
}
