import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { SelecteduserComponent } from './selecteduser/selecteduser.component';

const routes: Routes = [
  {
    path: '',
    component: SelecteduserComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'otpVerify',
    component: OtpVerificationComponent
  },
  {
    path: 'main',
    loadChildren: () => import('../main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
