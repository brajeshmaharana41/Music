import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/common/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private _httpClient$: HttpClient) {}

  getDashboard(): Observable<any> {
    return this._httpClient$.get(API.Dashboard.home, {
      headers: new HttpHeaders({
        servertoken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWE4Y2ZlZDczZjkxMjExMGI0NzNiZSIsInVzZXJfdHlwZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBkaGFrYXJlY29yZC5jb20iLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2NTc2NzUzODcsImV4cCI6MTY2MDI2NzM4N30.yIHQuseechEwEGeP0hHUG8yy-6vE2xmA5x-N1Fxx6n0',
      }),
    });
  }
}
