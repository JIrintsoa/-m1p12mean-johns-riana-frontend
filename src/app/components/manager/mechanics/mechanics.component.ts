/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-mechanics',
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './mechanics.component.html',
  styleUrl: './mechanics.component.scss'
})
export class MechanicsComponent implements OnInit {
  mechanics: User[] = [];
  token: string = localStorage.getItem('TOKEN_KEY');
    // form
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    successMessage: string = '';
    errorMessage: string = '';


    // Pagination options
    currentPage = 1;
    itemsPerPage = 3;
    totalItems = 0;

    //filter options
    searchTerm = '';
    status = '';

    //update
    mechanicToUpdate: User | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    activeModalUpdate: any;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalUpdate') contentModalUpdate: TemplateRef<any> | undefined;
  @ViewChild('contentModalDisable') contentModalDisable: TemplateRef<any> | undefined;


    constructor(
      private modalService: NgbModal,
      private mechanicService: MechanicService,
      private router:Router
    ){ }
  
    ngOnInit(): void {
      this.fetchActiveMechanics();
    }

    fetchMechanics(){
      this.mechanicService.getMechanics(this.currentPage, this.itemsPerPage, this.searchTerm, this.status, this.token).subscribe({
        next: (response: any) => {
          const result = response;
          this.mechanics = result.items || [];
        },
        error: (error) => {
          console.error('Error fetching mechanics', error);
        }
      });
    }
    fetchActiveMechanics(){
      this.mechanicService.getActiveMechanics(this.currentPage, this.itemsPerPage, this.searchTerm, this.token).subscribe({
        next: (response: any) => {
          const result = response;
          this.mechanics = result.items || [];
        },
        error: (error) => {
          console.error('Error fetching mechanics', error);
        }
      });
    }

    addMechanic(): void {
      const newMechanic = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
  
      this.mechanicService.addMechanic(newMechanic, this.token).subscribe({
        next: (response) => {
          console.log(response)
          this.showMessage('Mécanicien ajouté avec succès!', 'success');
          this.fetchMechanics();
          this.resetForm(); 
        },
        error: (error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } 
          else {
            this.showMessage('Erreur lors de la création du mécanicien.', 'error');
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
  
      setTimeout(() => {
        if (type === 'success') {
          this.successMessage = '';
        } else {
          this.errorMessage = '';
        }
      }, 10000); 
    }  

    resetForm(): void {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
    }

    resetFormUpdate(): void {
      this.mechanicToUpdate = null;
    }

    // pagination
    getPages(): number[] {
      const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
      return Array(pageCount).fill(0).map((_, index) => index + 1);
    }
  
    changePage(page: number): void {
      this.currentPage = page;
      this.fetchMechanics();
    }
  
    changeItemsPerPage(itemsPerPage: number): void {
      const firstItemOfCurrentPage = (this.currentPage - 1) * this.itemsPerPage;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = Math.ceil((firstItemOfCurrentPage + 1) / this.itemsPerPage);
      this.fetchMechanics();
    }

    // filters
    searchMechanics(): void {
      this.currentPage = 1; // Réinitialiser la page actuelle lors de la recherche
      this.fetchActiveMechanics();
    }

    // update mechanic
    updateMechanic(): void {
      if (this.mechanicToUpdate) {
        this.mechanicService.updateMechanic(this.mechanicToUpdate, this.token).subscribe({
          next: () => {
            this.fetchMechanics();
            this.activeModalUpdate.close()
          },
          error: (error) => {
            console.error('Error updating vehicle:', error);
          }
        });
      }
    }

    disableMechanic(): void {
      if (this.mechanicToUpdate) {
        console.log(this.mechanicToUpdate)
        this.mechanicService.disableMechanic(this.mechanicToUpdate, this.token).subscribe({
          next: () => {
            this.fetchMechanics();
            this.activeModalUpdate.close()
          },
          error: (error) => {
            console.error('Error updating vehicle:', error);
          }
        });
      }
    }

    openModalUpdate(contentModalUpdate: TemplateRef<any>, mechanic: User) {
      this.activeModalUpdate = this.modalService.open(contentModalUpdate, { centered: true });
      this.mechanicToUpdate = mechanic;
    }

    openModalDisable(contentModalDisable: TemplateRef<any>, mechanic: User) {
      this.activeModalUpdate = this.modalService.open(contentModalDisable, { centered: true });
      this.mechanicToUpdate = mechanic;
    }
}
