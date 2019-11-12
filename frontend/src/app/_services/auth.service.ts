import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Registration, UserInfo} from '../_models';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
  ) {
  }

  public login(email: string, password: string) {
    return this.http.post<any>(`${environment.authUrl}/auth/login`, {email: email, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.auth_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
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
    return this.http.get<Registration[]>(`${environment.authUrl}/auth/register/pending`);
  }

  register(registration: Registration) {
    return this.http.post(`${environment.authUrl}/auth/register`, registration);
  }

  approve(registration: Registration) {
    return this.http.post(`${environment.authUrl}/auth/register/approve`, registration);
  }

  profile(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.authUrl}/auth/profile`);
  }

  // forgot_pw() {
  //   return this.http.post(`${environment.authUrl}/auth/password/reset/request`);
  // }
  // reset_pw(): Observable<any> {
  //   return this.http.post<any>(`${environment.authUrl}/auth/password/reset/<token>`);
  // }


}

