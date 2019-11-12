import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login';
import {ProfileComponent} from './profile';
import {RegisterComponent} from './register';
import {AdminComponent} from './admin';
import {AuthGuard} from './_guards';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'exams'}
];

export const routing = RouterModule.forRoot(appRoutes);
