import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private _router: Router,
    private _mainService$: MainService,
    private formBuilder: FormBuilder,
    private _authService$: AuthService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      phone: ['9342514432', Validators.required],
    });
  }
  onClickSubmit() {
    console.log(this.signInForm.valid, 'hI');
    if (this.signInForm.valid) {
      this._mainService$.otpGeneration(this.signInForm.value.phone).subscribe({
        next: (res: CommonType.HttResponseType) => {
          if (res.status === Constants.SUCCESSSTATUSCODE) {
            this._authService$.otpPhone = this.signInForm.value.phone;
            this._router.navigate(['auth/otp-verify']);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        },
      });
    }
  }
}
