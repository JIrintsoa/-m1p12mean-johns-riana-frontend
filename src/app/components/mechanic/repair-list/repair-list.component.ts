import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppointmentFilterMechanic, AppointmentListe} from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { InterventionService } from 'src/app/services/intervention/intervention.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { formatDate } from 'src/app/utils/utils.function';

@Component({
  selector: 'app-repair-list',
  imports: [RouterLink, CardComponent, CommonModule, FormsModule],
  templateUrl: './repair-list.component.html',
  styleUrl: './repair-list.component.scss'
})
export class RepairListComponent implements OnInit {
  appointments : AppointmentListe[] ;
  token: string;
  formatDate = formatDate;
  user = JSON.parse(localStorage.getItem('user'));
  mechanicId = this.user ? this.user._id : null;

  Pagination= {
    itemsPerPage: 3,
    totalItems: 0,
    currentPage: 1,
  }

  filterInput: AppointmentFilterMechanic = {
    search: '',
    serviceTypeId: '',
    status: '',
    startDate: '',
    endDate: ''
  }

  constructor (
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private interventionService: InterventionService
  ) {
    this.token = authService.getToken()
  }

  ngOnInit(): void {
    this.fetchAppointmentByMechanic()
    // this.filterInput.startDate = getCurrentDate()
    // this.filterInput.endDate = getCurrentDate()
  }

  // Progress and cost
  // fetchTotalCost(appointmentId: string){
  //   this.interventionService.totalCostByAppointmentId(appointmentId).subscribe({
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     next: (response: any) => {
  //       console.log(response.totalCost)
  //       return response.totalCost
  //     },
  //     error: (error) => {
  //       console.error('Error fetching totalCost:', error);
  //     }
  //   })
  // }

  // fetchProgress(appointmentId: string): number {
  //   let value = 0
  //   this.interventionService.progressionByAppointmentId(appointmentId).subscribe({
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     next: (response: any) => {
  //       value = response.progress
  //     },
  //     error: (error) => {
  //       console.error('Error fetching progress:', error);
  //     }
  //   })
  //   return value
  // }

  fetchAppointmentByMechanic(){
    this.appointmentService.getAppointmentsByMechanic(
      this.token,
      this.Pagination.itemsPerPage,
      this.Pagination.currentPage,
      this.filterInput.search,
      this.filterInput.serviceTypeId,
      this.filterInput.status,
      this.filterInput.startDate,
      this.filterInput.endDate,
      this.mechanicId
    ).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        const result = response;
        this.appointments = result.items || [];
        this.Pagination.totalItems = result.totalItems;
        this.Pagination.currentPage = result.currentPage;
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  changePage(page: number): void {
    this.Pagination.currentPage = page;
    // console.log(page)
    this.fetchAppointmentByMechanic();
  }

  changeItemsPerPage(itemsPerPage: number): void {
    const firstItemOfCurrentPage = (this.Pagination.currentPage - 1) * this.Pagination.itemsPerPage;
    this.Pagination.itemsPerPage = itemsPerPage;
    this.Pagination.currentPage = Math.ceil((firstItemOfCurrentPage + 1) / this.Pagination.itemsPerPage);
    this.fetchAppointmentByMechanic();
  }

  searchAppointment(){
    this.Pagination.currentPage = 1; // Réinitialiser la page actuelle lors de la recherche
    this.fetchAppointmentByMechanic();
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.Pagination.totalItems / this.Pagination.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

}
