import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ExamsApiService} from './exams/exams-api.service';
import {ExamFormComponent} from './exams/exam-form.component';
import {ExamsComponent} from './exams/exams.component';
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
import { ForgotPasswordComponent } from './reset-pw/forgot-password.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component'


@NgModule({
  declarations: [
    AdminComponent,
    AlertComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AppComponent,
    ExamFormComponent,
    ExamsComponent,
    ModalComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ForgotPwComponent
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
    ExamsApiService,
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
