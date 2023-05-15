import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService {

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.post('/login', body);
  }

  register(body: any): Observable<any> {
    return this.post('/register', body);
  }

  confirmEmail(token: any): Observable<any> {
    return this.post('/confirm-email', {token: token});
  }

  logout(): Observable<any> {
    return this.post('/logout');
  }
}
