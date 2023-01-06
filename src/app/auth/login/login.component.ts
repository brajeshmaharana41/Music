import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm: any;
  hide = true;
  loginstatus = false;
  ShowRoomId: any;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      phone: new FormControl('7797911007', [Validators.required]),
    });
  }
  onClickSubmit() {
    console.log(this.signInForm.value, 'hI');
    this._router.navigate(['selectedUser/otp-verify']);
  }
}
