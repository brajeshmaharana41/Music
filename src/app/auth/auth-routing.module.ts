import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';
import { SelecteduserComponent } from './selecteduser/selecteduser.component';
import { SignUpEmailComponent } from './sign-up-email/sign-up-email.component';
import { SignUpLoginComponent } from './sign-up-login/sign-up-login.component';

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
    path: 'create-profile', //1 for international and 2 for bangladeshi
    component: ProfileCreationComponent,
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
