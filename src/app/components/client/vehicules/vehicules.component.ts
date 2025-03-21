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
  token: string = localStorage.getItem('TOKEN_KEY');
  // form
  model: string = '';
  brand: string = '';
  year: string = '';
  fuelType: string = '';
  successMessage: string = '';
  errorMessage: string = '';

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
        this.showMessage('Véhicule ajouté avec succès!', 'success');
        this.fetchVehicles(); // Refresh the vehicle list
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        this.showMessage('Erreur lors de l\'ajout du véhicule.', 'error');
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
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?');
    if(confirmation){
      this.vehicleService.deleteVehicle(vehicleId, this.token).subscribe({
        next: (response) => {
          this.showMessage('Véhicule supprimé avec succès!', 'success');
          console.log('Vehicle deleted successfully:', response);
          this.fetchVehicles();  // Refresh the vehicle list
        },
        error: (error) => {
          this.showMessage('Erreur durant la suppression du véhicule.', 'error');
          console.error('Error deleting vehicle:', error);
        }
      });
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    if (type === 'success') {
      this.successMessage = message;
      this.errorMessage = ''; 
    } else {
      this.errorMessage = message;
      this.successMessage = '';
    }

    // Hide the message after 3 seconds
    setTimeout(() => {
      if (type === 'success') {
        this.successMessage = '';
      } else {
        this.errorMessage = '';
      }
    }, 10000); 
  }
}

