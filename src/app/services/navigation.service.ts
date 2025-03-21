import { Injectable } from '@angular/core';
import { NavigationItem, NavigationItems } from '../theme/layouts/admin-layout/navigation/navigation'; // Importez votre interface et votre tableau
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private authService: AuthService) {}

  getNavigationItems(): NavigationItem[] {
    const userRole = this.authService.getUserRole();
    // console.log(userRole)
    if (!userRole) {
      return []; // Retourner un tableau vide si l'utilisateur n'est pas authentifié
    }
    // console.log(NavigationItems)

    return NavigationItems.filter(item => item.id === userRole);
  }
}