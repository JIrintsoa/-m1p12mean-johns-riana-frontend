import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister, UserLogin, LoginResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlRegister = `${environment.apiUrl}/clients`; // Utilise l'URL de l'API depuis l'environnement
  private apiUrlLogin = `${environment.apiUrl}/users/login`; // Utilise l'URL de l'API depuis l'environnement

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<unknown> {
    return this.http.post(this.apiUrlRegister, user);
  }

  login (user: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrlLogin, user);
  }
}