import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';// Assurez-vous que le chemin est correct
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && (error.status === 401 || error.status === 403)) {
          // Le token est expiré ou invalide
          // this.authService.logout(); // Supprimer le token et toute autre information d'authentification
          this.router.navigate(['/unauthorized']); // Rediriger vers la page de connexion
        }
        return throwError(() => error); // Propager l'erreur pour une gestion spécifique si nécessaire
      })
    );
  }
}