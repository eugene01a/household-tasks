import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Registration, UserInfo} from '../_models';
import {Observable, of, throwError} from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
    ) {
    }

    public login(email: string, password: string) {
        return this.http.post<any>(`${environment.authUrl}/auth/login`, {email, password})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.auth_token) {
                    console.log('login successful, response: ', user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }))
            .pipe(
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err);
                    return throwError(err);
                })
            );
    }

    isAuthenticated(): Observable<boolean> {
        if (localStorage.getItem('currentUser')) {
            return of(true);
        } else {
            return of(false);
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    pendingRegistrations(): Observable<Registration[]> {
        return this.http.get<Registration[]>(`${environment.authUrl}/auth/pending`);
    }

    register(registration: Registration) {
        console.log('Registration submitted', registration);
        return this.http.post(`${environment.authUrl}/auth/register`, registration).pipe(
            catchError(err => {
                console.log('Handling error locally and rethrowing it...', err);
                return throwError(err);
            })
        );
    }

    approve(registration: Registration) {
        return this.http.post(`${environment.authUrl}/auth/register/approve`, registration);
    }

    profile(): Observable<UserInfo> {
        return this.http.get<UserInfo>(`${environment.authUrl}/auth/profile`);
    }

    forgot_pw(email: string) {
        return this.http.post(`${environment.authUrl}/auth/password/reset/request`, {email});
    }

    // reset_pw() {
    //   return this.http.post<any>(`${environment.authUrl}/auth/password/reset/<token>`);
    // }


}

