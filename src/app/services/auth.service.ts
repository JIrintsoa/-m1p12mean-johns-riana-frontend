import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister, UserLogin, LoginResponse } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private jwtHelper = new JwtHelperService(); 

  private apiUrlRegister = `${environment.apiUrl}/clients`; // Utilise l'URL de l'API depuis l'environnement
  private apiUrlLogin = `${environment.apiUrl}/users/login`; // Utilise l'URL de l'API depuis l'environnement

  constructor(private http: HttpClient, private router: Router) {}

  register(user: UserRegister): Observable<unknown> {
    return this.http.post(this.apiUrlRegister, user);
  }

  login (user: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrlLogin, user);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.role; // Assurez-vous que la clé 'role' existe dans votre payload JWT
      } catch (error) {
        console.error('Erreur lors du décodage du token', error);
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
}