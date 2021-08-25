import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent, ModalComponent} from './_directives';
import {AlertService, ModalService, AuthService} from './_services';
import {routing} from './app.routing';
import {AuthGuard} from './_guards';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AdminComponent} from './admin';
import {LogoutComponent} from "./logout";
import {ProfileComponent} from "./profile";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor, ErrorInterceptor} from "./_helpers";
import { MatTableModule } from '@angular/material';
import { ForgotPwComponent } from './forgot-pw';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    AlertComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AppComponent,
    ModalComponent,
    ProfileComponent,
    ForgotPwComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTableModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    AuthService,
    ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
