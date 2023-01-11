import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  ProfileForm: FormGroup;

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],

    });
  }
  onClickSubmit() {
    this._router.navigate(['main/home']);
  }

}
