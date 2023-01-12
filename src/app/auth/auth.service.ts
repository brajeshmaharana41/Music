import { Injectable } from '@angular/core';
import { API } from '../shared/common/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandlerService } from '../shared/services/httphandler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  otpPhone: string;
  constructor(private _http$: HttpHandlerService) {}

  otpGeneration(
    mobile: string,
    device_id: string = 'fdf50f5dc954c41852ab349868bdssssdscddce'
  ) {
    return this._http$.post(API.User.otpGeneration, {
      mobile,
      device_id,
    });
  }

  otpVerification(mobile: string, otp_code: string) {
    return this._http$.post(API.User.otpValidation, {
      mobile,
      otp_code,
    });
  }

  signUp(signUpForm: FormData) {
    return this._http$.post(API.User.signUp, signUpForm);
  }

  signInByEmail(body: { email: string; password: string }) {
    return this._http$.post(API.User.signinByEmail, body);
  }
}
