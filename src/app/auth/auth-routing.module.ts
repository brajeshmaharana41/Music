import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { SelecteduserComponent } from './selecteduser/selecteduser.component';

const routes: Routes = [
  {
    path: 'selected-user',
    component: SelecteduserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'otp-verify',
    component: OtpVerificationComponent,
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
