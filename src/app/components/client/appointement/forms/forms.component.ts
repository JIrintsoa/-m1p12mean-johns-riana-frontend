import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { AppointmentListe } from 'src/app/models/appointment.model';
import { ServiceType } from 'src/app/models/service.model';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceTypeService } from 'src/app/services/service-type/service-type.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-forms',
  imports: [RouterLink,CardComponent, FormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  vehicles: VehicleModel[] = [];
  appointments: AppointmentListe[] = [];
  serviceTypes: ServiceType[] = [];
  token: string = '';
  selectedVehicle: VehicleModel | null = null;
  selectedServiceType: ServiceType | null = null;
  appointmentDate : string = '';
  comments: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  // router: any;

  constructor(
    private vehicleService: VehicleService, 
    private authService: AuthService,
    private serviceTypeService: ServiceTypeService,
    private appointmentService: AppointmentService
  ) { 
    // this.vehicles = await vehicleService.getVehicles();
    this.token = authService.getToken();
  }

  ngOnInit(): void {
    this.fetchVehicles();
    this.fetchServiceTypes();
    this.appointmentDate = this.getCurrentDate();
    // console.log('init');
  }

  fetchVehicles(): void {
    this.vehicleService.getVehicles(this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        // console.log('Raw response:', response);
        const result = response;
        console.log(result)
        this.vehicles = result.items || [];
        // console.log('Processed vehicles:', this.vehicles);
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  fetchAppointment(): void {
    this.appointmentService.getAppointments(this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        // console.log('Raw response:', response);
        const result = response;
        console.log(result)
        this.appointments = result.items || [];
        // console.log('Processed vehicles:', this.vehicles);
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  fetchServiceTypes(): void {
    this.serviceTypeService.getServiceTypes().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        const result =response;
        this.serviceTypes = result.items || [];
      },
      error: (error) => {
        console.error('Error fetching service types:', error);
      }
    });
  }

  onVehicleChange(): void {
    console.log('Véhicule sélectionné:', this.selectedVehicle);
    // Ajoutez ici la logique à exécuter lors de la sélection d'un véhicule
  }

  onServiceTypeChange(): void {
    console.log('Service sélectionné:', this.selectedServiceType);
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  resetForm(): void {
    this.selectedServiceType = null;
    this.selectedVehicle = null;
    this.appointmentDate = this.getCurrentDate();
    this.comments=  '';
  }

  addAppointment(): void {
    const newAppointment = {
      vehicleId: this.selectedVehicle._id,
      serviceTypeId: this.selectedServiceType._id,
      date: this.appointmentDate,
      description: this.comments
    };

    this.appointmentService.addAppointment(newAppointment, this.token).subscribe({
      next: (response) => {
        console.log('appointment added successfully:', response);
        this.showMessage('Rendez-vous ajouté avec succès!', 'success');
        this.fetchAppointment(); // Refresh the vehicle list
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout();
        } else {
          this.showMessage('Erreur lors de l\'ajout du rendez-vous.', 'error');
          console.error('Error adding appointment:', error);
        }
      }
    });
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
