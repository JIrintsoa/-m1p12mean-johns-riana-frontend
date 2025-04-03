import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { ServiceType } from 'src/app/models/service.model';
import { UserProfile } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { ServiceTypeService } from 'src/app/services/service-type/service-type.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink, CardComponent, FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})

export class AppointmentListComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalUpdate') contentModalUpdate: TemplateRef<any> | undefined;

  appointments: AppointmentModel[] = [];
  serviceTypes: ServiceType[] = [];
  mechanics: UserProfile[] = [];
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

  // assign mechanic options
  assigmentAppointmentId = '';
  assignmentMechanicId = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeModalUpdate: any;

  applyFilters(): void {
    this.fetchAppointmentsAll()
  }

  constructor(
    private appointmentService: AppointmentService, 
    private serviceTypeService: ServiceTypeService,
    private modalService: NgbModal,
    private mechanicService: MechanicService,
    private managerService: ManagerService,
  ){ }

  ngOnInit(): void {
    
    this.fetchAppointmentsAll();
    this.fetchServiceTypes();
    this.fetchMechanics();
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  fetchServiceTypes(): void {
    this.serviceTypeService.getServiceTypes().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        const result = response;
        this.serviceTypes = result.items || [];
      },
      error: (error) => {
        console.error('Error fetching service types:', error);
      }
    });
  }

  fetchMechanics(): void {
    this.mechanicService.getActiveMechanics(1, 20, '', this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        const result = response;
        this.mechanics = result.items || [];
      },
      error: (error) => {
        console.error('Error fetching mechanics', error);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalUpdate(contentModalUpdate: TemplateRef<any>, appointmentId: string) {
    this.activeModalUpdate = this.modalService.open(contentModalUpdate, { centered: true });
    this.assigmentAppointmentId = appointmentId;
  }
  assignMechanicToAppointment(): void {
    this.managerService.assignMechanicToAppointment(this.assignmentMechanicId,this.assigmentAppointmentId, this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log("Mechanic assigned successfully", response);
        this.activeModalUpdate.close();
        this.fetchAppointmentsAll(); 
      },
      error: (error) => {
        console.error('Error during the update', error);
      }
    });
}
}


