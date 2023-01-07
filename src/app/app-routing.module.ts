import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthTokenGuard,
  NoAuthTokenGuard,
} from './shared/services/auth-guard.service';

const routes: Routes = [
  // {
  //   path: 'main',
  //   loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  // },
  // {
  //   path: '',
  //   redirectTo: 'main',
  //   pathMatch: 'full',
  // },
  {
    path: 'auth',
    canActivate: [NoAuthTokenGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'main',
    canActivate: [AuthTokenGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
