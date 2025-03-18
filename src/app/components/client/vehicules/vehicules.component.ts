import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
@Component({
  selector: 'app-vehicules',
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './vehicules.component.html',
  styleUrl: './vehicules.component.scss'
})

export class VehiculesComponent implements OnInit {
  vehicles: VehicleModel[] = [];  // Explicitly declare the type of vehicles
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDkwN2Q0NmU2OWRlNWEwOWNiNjFmMCIsImVtYWlsIjoiY2xpZW50MUBnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzQyMzAzMTc3LCJleHAiOjE3NDIzMDY3Nzd9.jRVuW6PvFn-d4vjKbtpFk61T79LUvcIBtPROiWHwLFc'
  // form
  model: string = '';
  brand: string = '';
  year: string = '';
  fuelType: string = '';

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.fetchVehicles();
    console.log('init');
  }

  fetchVehicles(): void {
    this.vehicleService.getVehicles(this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log('Raw response:', response);
        const result = response;
        this.vehicles = result.items || [];
        console.log('Processed vehicles:', this.vehicles);
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  addVehicle(): void {
    const newVehicle = {
      brand: this.brand,
      model: this.model,
      year: this.year,
      fuelType: this.fuelType,
    };

    this.vehicleService.addVehicle(newVehicle, this.token).subscribe({
      next: (response) => {
        console.log('Vehicle added successfully:', response);
        this.fetchVehicles(); // Refresh the vehicle list
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        console.error('Error adding vehicle:', error);
      }
    });
  }

  resetForm(): void {
    this.brand = '';
    this.model = '';
    this.year = '';
    this.fuelType = '';
  }

  deleteVehicle(vehicleId: string): void {
    this.vehicleService.deleteVehicle(vehicleId, this.token).subscribe({
      next: (response) => {
        console.log('Vehicle deleted successfully:', response);
        this.fetchVehicles();  // Refresh the vehicle list
      },
      error: (error) => {
        console.error('Error deleting vehicle:', error);
      }
    });
  }
}

