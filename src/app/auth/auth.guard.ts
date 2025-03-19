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
    const userRole = this.authService.getUserRole();

    if (!token) {
      // Si aucun token n'est trouvé, vérifier si l'utilisateur est sur la page de connexion
      if (route.routeConfig?.path !== 'login') {
        this.router.navigate(['/login']);
        return false;
      }
      return true; // Autoriser l'accès à la page de connexion
    }
    else if (route.routeConfig?.path === 'login'){
      this.redirectToHome(userRole);
      return false;
    }

    // Si l'utilisateur est déjà connecté et tente d'accéder à la page de connexion, le rediriger
    // if (route.routeConfig?.path === 'login') {
    //   this.redirectToHome(userRole);
    //   return false;
    // }

    if (!expectedRole || expectedRole.length === 0 || expectedRole.includes(userRole)) {
        return true; // L'accès est autorisé si aucun rôle spécifique n'est requis ou si le rôle de l'utilisateur correspond à un rôle attendu
    } else {
        this.router.navigate(['/unauthorized']); // Rediriger vers une page d'accès non autorisé
        return false;
    }
  }

  private redirectToHome(userRole: string | null): void {
    if (userRole === 'manager') {
      this.router.navigate(['/manager/appointment-list']);
    } else if (userRole === 'mechanic') {
      this.router.navigate(['/mechanic/repair-list']);
    } else if (userRole === 'client') {
      this.router.navigate(['/client/take-appointment']);
    } else {
      this.router.navigate(['/']); // Rediriger vers une page par défaut si le rôle n'est pas reconnu
    }
  }
}