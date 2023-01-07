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

@NgModule({
  declarations: [
    LoginComponent,
    SelecteduserComponent,
    OtpVerificationComponent,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
