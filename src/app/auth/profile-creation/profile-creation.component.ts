import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/shared/common/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttResponseType } from 'src/app/shared/type/common-type';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.component.html',
  styleUrls: ['./profile-creation.component.scss'],
})
export class ProfileCreationComponent implements OnInit {
  ProfileForm: FormGroup;
  dataimage: File | string;
  rawImage: File;
  profilePageRoutedFromId: string; // 1 is for international and 2 is for Bangladesh
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _authService$: AuthService,
    private _commonService$: CommonService
  ) {
    this.profilePageRoutedFromId = localStorage.getItem(Constants.USERTYPE);
  }

  ngOnInit(): void {
    this.ProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      gender: ['', Validators.required],
      phone: [
        this.profilePageRoutedFromId === '2'
          ? localStorage.getItem(Constants.INITIALSIGNUPDATA)
          : '',
        Validators.required,
      ],
      country: [
        this.profilePageRoutedFromId === '2' ? 'Bangladesh' : '',
        Validators.required,
      ],
    });
  }

  onClickSubmit() {
    if (this.ProfileForm.valid) {
      console.log(this.ProfileForm);
      this._authService$
        .signUp(this.createFormData(this.ProfileForm.value))
        .subscribe({
          next: (res: HttResponseType) => {
            if (res && res.status === Constants.SUCCESSSTATUSCODE) {
              this._commonService$.storeSessionInfo(res);
              localStorage.removeItem(Constants.INITIALSIGNUPDATA);
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
    const preData = JSON.parse(
      localStorage.getItem(Constants.INITIALSIGNUPDATA)
    );
    const form: FormData = new FormData();
    form.append('name', data.name);
    form.append('country', data.country);
    form.append('dob', moment(data.dateofbirth).format('YYYY-MM-DD'));
    form.append('gender', data.gender);
    if (this.rawImage) {
      form.append('file', this.rawImage);
    }
    if (this.profilePageRoutedFromId === '1') {
      form.append('email', preData.email);
      form.append('password', preData.password);
    } else {
      form.append('mobile', preData);
    }
    return form;
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.rawImage = imgFile.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(imgFile.target.files[0]);

      reader.onload = (imgFile: any) => {
        this.dataimage = imgFile.target.result;
      };
    }
  }
}
