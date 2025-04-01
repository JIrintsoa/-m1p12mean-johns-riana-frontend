import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  constructor(
    private authService: AuthService
  ) { }
  removeTokenUser(){
    this.authService.removeToken()
  }
}