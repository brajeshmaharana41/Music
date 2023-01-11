import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ['', Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}'), Validators.minLength(8), Validators.maxLength(20),],
    });
  }
  public SignInError = (controlName: string, errorName: string) => {
    return this.signInForm.controls[controlName].hasError(errorName);
  }
  onClickSubmit() {
    this._router.navigate(['main/home']);
  }
}
