import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-mobile',
  templateUrl: './sign-up-mobile.component.html',
  styleUrls: ['./sign-up-mobile.component.scss']
})
export class SignUpMobileComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      phone: ['', Validators.required],
    });
  }
  onClickSubmit() {
    this._router.navigate(['auth/profileUpdate']);
  }
}
