import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { SelecteduserComponent } from './selecteduser/selecteduser.component';
import { SignUpEmailComponent } from './sign-up-email/sign-up-email.component';
import { SignUpLoginComponent } from './sign-up-login/sign-up-login.component';
import { SignUpMobileComponent } from './sign-up-mobile/sign-up-mobile.component';

const routes: Routes = [
  {
    path: 'selected-user',
    component: SelecteduserComponent,
  },
  {
    path: 'login/:id',
    component: LoginComponent,
  },
  {
    path: 'otp-verify/:id',
    component: OtpVerificationComponent,
  },
  {
    path: 'signupOrLogin', //1 for international and 2 for bangladeshi
    component: SignUpLoginComponent,
  },
  {
    path: 'signupEmail/:id', //1 for signup and 2 for signin
    component: SignUpEmailComponent,
  },
  {
    path: 'LoginEmail',
    component: LoginEmailComponent,
  },
  {
    path: 'signupMobile',
    component: SignUpMobileComponent,
  },
  {
    path: 'profileUpdate', //1 for international and 2 for bangladeshi
    component: ProfileUpdateComponent,
  },
  {
    path: '',
    redirectTo: 'selected-user',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
