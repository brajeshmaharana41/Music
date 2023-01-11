import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SelecteduserComponent } from './selecteduser/selecteduser.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { SignUpEmailComponent } from './sign-up-email/sign-up-email.component';
import { SignUpMobileComponent } from './sign-up-mobile/sign-up-mobile.component';
import { SignUpLoginComponent } from './sign-up-login/sign-up-login.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import {MatIconModule} from '@angular/material/icon';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    LoginComponent,
    SelecteduserComponent,
    OtpVerificationComponent,
    SignUpEmailComponent,
    SignUpMobileComponent,
    SignUpLoginComponent,
    LoginEmailComponent,
    ProfileUpdateComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
