import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/main/main.service';
import * as CommonType from '../../shared/type/common-type';
import { Constants } from '../../shared/common/constant';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;
  loginstatus = false;
  ShowRoomId: any;
  signUpORSignin: '1' | '2'; // 1 for signup and 2 for signin
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _mainService$: MainService,
    private _authService$: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.signUpORSignin = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      phone: ['', Validators.required],
    });
  }
  onClickSubmit() {
    if (this.signInForm.valid) {
      this._authService$.otpGeneration(this.signInForm.value.phone).subscribe({
        next: (res: CommonType.HttResponseType) => {
          if (res.status === Constants.SUCCESSSTATUSCODE) {
            localStorage.setItem(
              Constants.INITIALSIGNUPDATA,
              this.signInForm.value.phone
            );
            // alert('Otp sent to your register mobile number');
            this._router.navigate([`auth/otp-verify/${this.signUpORSignin}`]);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        },
      });
    }
  }
}
