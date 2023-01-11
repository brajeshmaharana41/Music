import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/shared/common/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttResponseType } from 'src/app/shared/type/common-type';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up-email',
  templateUrl: './sign-up-email.component.html',
  styleUrls: ['./sign-up-email.component.scss'],
})
export class SignUpEmailComponent implements OnInit {
  signUpForm: FormGroup;
  hide = true;
  chide = true;
  signUpORSignIn: '1' | '2'; // 1 for signUp and 2 signin
  constructor(
    private formBuilder: FormBuilder,
    private _router$: Router,
    private activatedRoute: ActivatedRoute,
    private _authService$: AuthService,
    private _commonService$: CommonService
  ) {
    this.signUpORSignIn = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,20}'
          // ),
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      confirmpassword: [''],
    });
  }

  // passwordConfirming(c: AbstractControl): { invalid: boolean } {
  //   if (c.get('password').value !== c.get('confirm_password').value) {
  //     return { invalid: true };
  //   } else {
  //     return { invalid: false };
  //   }
  // }
  public SignUpError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
  };

  // passwordErrorMatcher = {
  //   isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
  //     const controlInvalid = control.touched && control.invalid;
  //     const formInvalid =
  //       control.touched &&
  //       this.signUpForm.get('confirmpassword').touched &&
  //       this.signUpForm.invalid;
  //     return controlInvalid || formInvalid;
  //   },
  // };

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid =
        control.touched &&
        this.signUpForm.get('password').value !=
          this.signUpForm.get('confirmpassword').value;
      return controlInvalid || formInvalid;
    },
  };

  getErrorMessage(controlName: string) {
    if (this.signUpForm.controls[controlName].hasError('minlength')) {
      return 'Password must Includes upper & lower case with special character and numbers';
    }
    const password = this.signUpForm.get('password').value;
    const confirm = this.signUpForm.get('confirmpassword').value;
    return password === confirm ? null : 'Passwords must match';
  }

  onClickSubmit() {
    if (this.signUpForm.valid) {
      if (this.signUpORSignIn === '1') {
        localStorage.setItem(
          Constants.INITIALSIGNUPDATA,
          JSON.stringify(this.signUpForm.value)
        );
        this._router$.navigate(['auth/profileUpdate']);
      } else {
        let body = {
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
        };
        this._authService$.signInByEmail(body).subscribe({
          next: (res: HttResponseType) => {
            if (res.status === Constants.SUCCESSSTATUSCODE) {
              this._commonService$.storeSessionInfo(res);
              this._router$.navigate(['main/home']);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
