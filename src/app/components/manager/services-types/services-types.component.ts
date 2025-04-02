/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceType } from 'src/app/models/service.model';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceTypeService } from 'src/app/services/service-type/service-type.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-services-types',
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './services-types.component.html',
  styleUrl: './services-types.component.scss'
})
export class ServicesTypesComponent implements OnInit{
  //init
  token: string | null; 

  // Form serviceType
  name: string | null;
  description: string | null;

  // Select service Types
  serviceTypeSelected: ServiceType;

  // Input search ServiceTypes
  searchTerm: string | null;

  // Array Variable
  serviceTypes: ServiceType[] ;

  // Pagination options
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;

  // Message success and error
  successMessage: string = '';
  errorMessage: string = '';

  // Variable active Modal delete and update
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeModalUpdate: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeModaleDelete: any;

  // Template Popup Modal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalUpdate') contentModalUpdate: TemplateRef<any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalDelete') contentModalDelete: TemplateRef<any> | undefined;

  constructor( 
    private modalService: NgbModal,
    private authService: AuthService,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
  ){
    this.token = this.authService.getToken();
  }

  ngOnInit(): void {
      this.fetchServiceTypes()
  }

  // CRUD Function
  addServiceType(){
    const newServiceType = {
      name: this.name,
      description: this.description
    };

    this.serviceTypeService.add(newServiceType, this.token).subscribe({
      next: (response) => {
        console.log('Service Type added successfully:', response);
        this.showMessage('Véhicule ajouté avec succès!', 'success');
        this.fetchServiceTypes(); // Refresh the Service Type list
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } 
        else {
          this.showMessage('Erreur lors de l\'ajout du véhicule.', 'error');
          console.error('Error adding Service Type:', error);
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

  resetForm(): void {
    this.name = '';
    this.description = '';
  }

  updateServiceType(){

  }

  deleteServiceType(serviceTypeSelected: ServiceType){
    console.log(serviceTypeSelected)
  }

  fetchServiceTypes(){
    this.serviceTypeService.getServiceTypes(this.searchTerm).subscribe({
      next: (response: any) => {
        const result = response;
        this.serviceTypes = result.items || [];
        this.totalItems = result.totalItems
      },
      error: (error) => {
        console.error('Error fetching mechanics', error);
      }
    });
  }

  searchServiceTypes(){
    this.currentPage = 1; // Réinitialiser la page actuelle lors de la recherche
    this.fetchServiceTypes();
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchServiceTypes();
  }

  changeItemsPerPage(itemsPerPage: number): void {
    const firstItemOfCurrentPage = (this.currentPage - 1) * this.itemsPerPage;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = Math.ceil((firstItemOfCurrentPage + 1) / this.itemsPerPage);
    this.fetchServiceTypes();
  }

  // Popup modal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalUpdate(contentModalUpdate: TemplateRef<any>, serviceType: ServiceType) {
    this.activeModalUpdate = this.modalService.open(contentModalUpdate, { centered: true });
    this.serviceTypeSelected = serviceType;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalDelete(contentModalDelete: TemplateRef<any>, serviceType: ServiceType){
    this.activeModaleDelete = this.modalService.open(contentModalDelete, {centered: true})
    this.serviceTypeSelected = serviceType;
  }


}
