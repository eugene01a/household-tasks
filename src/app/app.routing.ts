import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login';
import {ProfileComponent} from './profile';
import {RegisterComponent} from './register';
import {ForgotPwComponent} from './forgot-pw';
import {AdminComponent} from './admin';
import {ResetPwComponent} from './reset-pw';
import {AuthGuard} from './_guards';
import {DashboardComponent} from './dashboard/dashboard.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'forgot-pw', component: ForgotPwComponent},
  {path: 'reset-pw', component: ResetPwComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: '**', component: DashboardComponent, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(appRoutes);
