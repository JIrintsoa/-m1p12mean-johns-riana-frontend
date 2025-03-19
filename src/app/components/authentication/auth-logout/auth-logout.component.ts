import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '', // Le template peut être vide car nous allons rediriger immédiatement
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}