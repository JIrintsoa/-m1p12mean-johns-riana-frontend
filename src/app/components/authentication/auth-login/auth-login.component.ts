// project import
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['johnsirintsoa18@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Gérer la réponse de l'API (par exemple, stocker le token, rediriger)
          console.log('Connexion réussie', response);
          // Stocker le token dans le localStorage ou sessionStorage
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']); // Rediriger vers le tableau de bord
        },
        error: (error) => {
          // Gérer les erreurs de l'API
          console.error('Erreur de connexion', error);
          this.errorMessage = 'Email ou mot de passe incorrect.';
        },
      });
    }
  }

}
