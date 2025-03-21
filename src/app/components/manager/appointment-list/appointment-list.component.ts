import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink, CardComponent, FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit {
  appointments: AppointmentModel[] = []; 
  token: string = localStorage.getItem('TOKEN_KEY');

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointmentsAll();
  }

  fetchAppointmentsAll(): void {
    this.appointmentService.getAppointmentsAll(this.token).subscribe({
      next: (response: any) => {
        const result = response;
        
        this.appointments = result.items || [];
        this.appointments.forEach(appointment => {
          appointment.formattedDate = this.formatDateInFrench(appointment.date);
        });
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }

  // Separate function for date formatting
  formatDateInFrench(value: string | Date): string {
    const frenchMonths = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    const date = new Date(value);
    
    // Format the date manually
    const day = date.getDate();
    const month = frenchMonths[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day} ${month} ${year}`;

    return formattedDate;
  }
}



