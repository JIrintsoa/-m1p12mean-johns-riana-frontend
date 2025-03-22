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

  // Pagination options
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;

  // filter options
  searchTerm = '';
  status = '';
  serviceTypeId = '';
  startDate = '';
  endDate = '';

  applyFilters(): void {
    this.fetchAppointmentsAll()
  }

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.fetchAppointmentsAll();
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchAppointmentsAll();
  }

  changeItemsPerPage(itemsPerPage: number): void {
    const firstItemOfCurrentPage = (this.currentPage - 1) * this.itemsPerPage;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = Math.ceil((firstItemOfCurrentPage + 1) / this.itemsPerPage);
    this.fetchAppointmentsAll();
  }

  // end pagination
  fetchAppointmentsAll(): void {
    const limit = this.itemsPerPage;
    this.appointmentService.getAppointmentsAll(
      this.token, 
      this.currentPage,
      limit,
      this.searchTerm,
      this.status,
      this.serviceTypeId,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (response: any) => {
        const result = response;
        this.appointments = result.items || [];
        this.appointments.forEach(appointment => {
          appointment.formattedDate = this.formatDateInFrench(appointment.date);
        });
        this.totalItems = result.totalItems || 0;  // Set total items for pagination
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



