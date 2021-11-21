import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Registration, Role, UserInfo} from '../_models';
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

    isAdmin(): Observable<boolean> {
        if (localStorage.getItem('currentUser')) {
            if (JSON.parse(localStorage.getItem('currentUser')).role === 'Admin') {
                return of(true);
            }
        }
        return of(false);
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    pendingRegistrations(): Observable<Registration[]> {
        return this.http.get<any>(`${environment.authUrl}/admin/pending`)
            .pipe(map(response => {
                return response.pending_registrations;
            }));
    }

    register(registration: Registration) {
        console.log('Registration submitted', registration);
        const registerObject = {
            first_name: registration.firstName,
            last_name: registration.lastName,
            email: registration.email,
            reason: registration.reason
        };
        return this.http.post(`${environment.authUrl}/auth/register`, registerObject).pipe(
            catchError(err => {
                console.log('Handling error locally and rethrowing it...', err);
                return throwError(err);
            })
        );
    }

    public approve(registrationId: number, roleId: number) {
        const approveObject = {
            registration_id: registrationId,
            role_id: roleId,
        };
        return this.http.post<any>(`${environment.authUrl}/admin/pending/approve`, approveObject);
    }

    deny(registrationId: number) {
        return this.http.request('delete', `${environment.authUrl}/admin/pending/deny`,
            { body: registrationId });
    }


    profile(): Observable<UserInfo> {
        return this.http.get<any>(`${environment.authUrl}/user/profile`).pipe(map(response => {
            return response.user_info;
        }));
    }

    forgot_pw(email: string) {
        return this.http.post(`${environment.authUrl}/auth/password/reset/request`, {email});
    }

    roles(): Observable<Role[]> {
        return this.http.get<any>(`${environment.authUrl}/admin/roles`)
            .pipe(map(response => {
                return response.roles;
            }));
    }


    // reset_pw() {
    //   return this.http.post<any>(`${environment.authUrl}/auth/password/reset/<token>`);
    // }


}

