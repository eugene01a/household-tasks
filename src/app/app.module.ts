import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './_directives';
import {AlertService, AuthService} from './_services';
import {routing} from './app.routing';
import {AuthGuard} from './_guards';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AdminComponent} from './admin';
import {ProfileComponent} from './profile';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {ForgotPwComponent} from './forgot-pw';
import {ResetPwComponent} from './reset-pw';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ModalModule } from './_modal';
import {LogoutComponent} from './logout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [
        AdminComponent,
        AlertComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        AppComponent,
        ProfileComponent,
        ForgotPwComponent,
        DashboardComponent,
        ResetPwComponent
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
        MatTableModule,
        ModalModule,
        MatCheckboxModule,
        MatListModule,
        MatGridListModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
