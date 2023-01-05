import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  signInForm: any
  hide = true;
  loginstatus = false;
  ShowRoomId: any;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      otp1 : new FormControl('1', [Validators.required]),
      otp2 : new FormControl('2', [Validators.required]),
      otp3 : new FormControl('3', [Validators.required]),
      otp4 : new FormControl('4', [Validators.required]),

    })
  }
  onClickSubmit(){
    console.log(this.signInForm.value, "hI")
    this._router.navigate(['selectedUser/main']);
  }
}
