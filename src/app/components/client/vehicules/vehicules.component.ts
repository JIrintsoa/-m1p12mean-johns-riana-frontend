import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleModel } from 'src/app/models/vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeModalUpdate: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalUpdate') contentModalUpdate: TemplateRef<any> | undefined;

  // Pagination options
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;
  searchTerm = '';
  
  vehicleToUpdate: VehicleModel | null = null;
  
  // itemsPerPageOptions = [3, 5, 10, 20];

  constructor( 
    private vehicleService: VehicleService, 
    private authService: AuthService, 
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.token = authService.getToken();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalUpdate(contentModalUpdate: TemplateRef<any>, vehicle: VehicleModel) {
		this.activeModalUpdate = this.modalService.open(contentModalUpdate, { centered: true });
    this.vehicleToUpdate = vehicle;
	}

  ngOnInit(): void {
    this.fetchVehicles();
  }

  fetchVehicles(): void {
    // const offset = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
    // console.log(this.searchTerm)

    this.vehicleService.getVehicles(this.token, this.currentPage,limit, this.searchTerm).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        const result = response;
        this.vehicles = result.items || [];
        this.totalItems = result.totalItems;
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  searchVehicles(): void {
    this.currentPage = 1; // Réinitialiser la page actuelle lors de la recherche
    this.fetchVehicles();
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchVehicles();
  }

  changeItemsPerPage(itemsPerPage: number): void {
    const firstItemOfCurrentPage = (this.currentPage - 1) * this.itemsPerPage;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = Math.ceil((firstItemOfCurrentPage + 1) / this.itemsPerPage);
    this.fetchVehicles();
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
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } 
        else {
          this.showMessage('Erreur lors de l\'ajout du véhicule.', 'error');
          console.error('Error adding vehicle:', error);
        }
      }
    });
  }

  updateVehicle(): void {
    if (this.vehicleToUpdate) {
      this.vehicleService.updateVehicle(this.vehicleToUpdate, this.token).subscribe({
        next: () => {
          this.fetchVehicles();
          this.activeModalUpdate.close()
        },
        error: (error) => {
          console.error('Error updating vehicle:', error);
        }
      });
    }
  }
  

  resetForm(): void {
    this.brand = '';
    this.model = '';
    this.year = '';
    this.fuelType = '';
  }

  resetFormUpdate(): void {
    this.vehicleToUpdate = null;
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

