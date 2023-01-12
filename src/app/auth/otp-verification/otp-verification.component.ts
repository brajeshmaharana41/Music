import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/main/main.service';
import * as CommonType from '../../shared/type/common-type';
import * as AuthType from '../../shared/type/auth-type';
import { Constants } from '../../shared/common/constant';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgOtpInputConfig } from 'ng-otp-input';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  otp: FormControl;
  hide = true;
  loginstatus = false;
  ShowRoomId: any;
  signUpORSignin: '1' | '2'; // 1 for signup and 2 for signin
  constructor(
    private _router: Router,
    private _mainService$: MainService,
    private _authService$: AuthService,
    private _commonService$: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.signUpORSignin = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.otp = new FormControl('1234', [Validators.required]);
  }
  onClickSubmit() {
    if (this.otp && this.otp.valid) {
      if (this.signUpORSignin === '1') {
        this._router.navigate(['auth/profileUpdate']);
      } else {
        this.verifyOTPAPI(
          localStorage.getItem(Constants.INITIALSIGNUPDATA),
          this.otp.value
        );
      }
    }
  }

  verifyOTPAPI(otpPhone: string, otp: string) {
    this._authService$.otpVerification(otpPhone, otp).subscribe({
      next: (res: AuthType.LoginResponseType) => {
        if (res && res.status === Constants.SUCCESSSTATUSCODE) {
          localStorage.setItem(Constants.INITIALSIGNUPDATA, otpPhone);
          this._commonService$.storeSessionInfo(res);
          this._router.navigate(['main/home']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }
  otpConfig: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      display: 'flex',
    },
    containerStyles: {
      display: 'flex',
    },
    inputClass: 'each_input',
    containerClass: 'all_inputs',
  };
}
