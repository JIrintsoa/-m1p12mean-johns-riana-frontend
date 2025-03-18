import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService ,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();
    const expectedRole = route.data['roles'] as string[];

    if (!token) {
        this.router.navigate(['/login']);
        return false;
    }

    const userRole = this.authService.getUserRole();
    console.log(`Rôle de l'utilisateur : ${userRole}`);
    console.log(`Rôle(s) attendu(s) : ${expectedRole}`);

    if (!expectedRole || expectedRole.length === 0 || expectedRole.includes(userRole)) {
        return true; // L'accès est autorisé si aucun rôle spécifique n'est requis ou si le rôle de l'utilisateur correspond à un rôle attendu
    } else {
        this.router.navigate(['/unauthorized']); // Rediriger vers une page d'accès non autorisé
        return false;
    }
    // if (localStorage.getItem('token')) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}