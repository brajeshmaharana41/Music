import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up-email',
  templateUrl: './sign-up-email.component.html',
  styleUrls: ['./sign-up-email.component.scss']
})
export class SignUpEmailComponent implements OnInit {
  signUpForm: any
  hide = true;
  chide = true;
  constructor(private formBuilder: FormBuilder, private _router$: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ['', Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}'), Validators.minLength(8), Validators.maxLength(20),],
      confirmpassword: ['', Validators.required],
    });
  }
  public SignUpError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
  }

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.signUpForm.get('confirmpassword').touched && this.signUpForm.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.signUpForm.get('password').value != this.signUpForm.get('confirmpassword').value;
      return controlInvalid || formInvalid;
    }
  }

  getErrorMessage(controlName: string) {
    if (this.signUpForm.controls[controlName].hasError('minlength')) {
      return 'Password must Includes upper & lower case with special character and numbers'
    }
    const password = this.signUpForm.get('password').value
    const confirm = this.signUpForm.get('confirmpassword').value
    return password === confirm ? null : 'Passwords must match';
  }

  onClickSubmit() {
    this._router$.navigate(['auth/profileUpdate']);
  }
}
