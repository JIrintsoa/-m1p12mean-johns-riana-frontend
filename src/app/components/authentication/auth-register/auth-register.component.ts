// Angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})

export class AuthRegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  
  // public method
  SignUpOptions = [
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
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  OnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Écouter les changements de valeur des champs
    this.registerForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.registerForm.reset(); // Réinitialiser le formulaire
        this.errorMessage = null; // Effacer le message d'erreur
      }
    });
  }

  onSubmit() {

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          // Gérer la réponse de l'API (par exemple, rediriger l'utilisateur)
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
        },
        error: (error) => {
          // Gérer les erreurs de l'API
          console.error('Erreur d\'inscription', error);
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription.'; // Afficher un message d'erreur à l'utilisateur
        },
      });
    } else {
      // Le formulaire est invalide, vérifier si les champs sont vides
      if (this.registerForm.get('firstName')?.hasError('required') ||
          this.registerForm.get('lastName')?.hasError('required') ||
          this.registerForm.get('email')?.hasError('required') ||
          this.registerForm.get('password')?.hasError('required')) {
        this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      } else {
        this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      }
    }
  }

}
