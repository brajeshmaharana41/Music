import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/shared/common/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { BodyUserDataType } from 'src/app/shared/type/auth-type';
import { HttResponseType } from 'src/app/shared/type/common-type';
import { MainService } from '../main.service';
import * as moment from 'moment';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit {
  dataimage: File | string;
  rawImage: File;
  ProfileForm: FormGroup;
  userData: any;
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _commonService$: CommonService,
    private _mainService$: MainService
  ) {
    // this.userData = JSON.parse(localStorage.getItem(Constants.LOGGEDINUSER));
    // this.dataimage = this.userData.profile_pic;
  }

  ngOnInit(): void {
    this.getUserdetails();
  }

  initializeForm() {
    console.log(moment('1988-10-02').format('MM/DD/YYYY'));
    this.ProfileForm = this.formBuilder.group({
      name: [this.userData.name, Validators.required],
      dateofbirth: [
        new Date(moment(this.userData.dob).format('MM/DD/YYYY')),
        Validators.required,
      ],
      gender: [this.userData.gender, Validators.required],
    });
  }

  getUserdetails() {
    this._mainService$.userDetails().subscribe({
      next: (res: HttResponseType) => {
        if (res && res.status === Constants.SUCCESSSTATUSCODE) {
          this.userData = res.body;
          this.dataimage = this.userData.profile_pic;
          this.initializeForm();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  onClickSubmit() {
    // console.log(this.ProfileForm);
    // console.log(moment(this.ProfileForm.value.dateofbirth));
    if (this.ProfileForm.valid) {
      this._mainService$
        .updateProfile(this.createFormData(this.ProfileForm.value))
        .subscribe({
          next: (res: HttResponseType) => {
            if (res && res.status === Constants.SUCCESSSTATUSCODE) {
              const obj = {
                subscription_status: res.body.subscription_status,
                gender: res.body.gender,
                name: res.body.name,
                profile_pic: res.body.profile_pic,
              };
              localStorage.setItem(Constants.LOGGEDINUSER, JSON.stringify(obj));
              this._commonService$.userUpdated.next('');
              // this._commonService$.storeSessionInfo(res);
              this._router.navigate(['main/home']);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });
    }
  }

  createFormData(data: any) {
    console.log(data);
    const form: FormData = new FormData();
    form.append('name', data.name);
    // form.append('country', data.country);
    form.append('dob', moment(data.dateofbirth).format('YYYY-MM-DD'));
    if (this.rawImage) {
      form.append('file', this.rawImage);
    }
    form.append('gender', data.gender);
    return form;
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      var reader = new FileReader();
      this.rawImage = imgFile.target.files[0];
      reader.readAsDataURL(imgFile.target.files[0]);

      reader.onload = (imgFile: any) => {
        this.dataimage = imgFile.target.result;
      };
    }
  }
}
