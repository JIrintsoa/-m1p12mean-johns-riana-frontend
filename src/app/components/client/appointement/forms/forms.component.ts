import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-forms',
  imports: [RouterLink,CardComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  vehicles: VehicleModel[] = [];
  token: string = '';

  constructor(private vehicleService: VehicleService, authService: AuthService) { 
    this.token = authService.getToken();
  }

  fetchVehicles(): void {
    this.vehicleService.getVehicles(this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        // console.log('Raw response:', response);
        const result = response;
        this.vehicles = result.items || [];
        // console.log('Processed vehicles:', this.vehicles);
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }
}
