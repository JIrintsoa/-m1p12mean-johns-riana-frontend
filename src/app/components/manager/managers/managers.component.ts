/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UserProfile } from 'src/app/models/user.model';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-managers',
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.scss'
})
export class ManagersComponent implements OnInit {
  managers: User[] = [];
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
    managerToUpdate: User | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    activeModalUpdate: any;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalUpdate') contentModalUpdate: TemplateRef<any> | undefined;
  @ViewChild('contentModalDisable') contentModalDisable: TemplateRef<any> | undefined;


    constructor(
      private modalService: NgbModal,
      private managerService: ManagerService,
      private router:Router
    ){ }
  
    ngOnInit(): void {
      this.fetchManagers();
    }

    fetchManagers(){
      this.managerService.getManagers(this.currentPage, this.itemsPerPage, this.searchTerm, this.status, this.token).subscribe({
        next: (response: any) => {
          const result = response;
          this.managers = result.items || [];
        },
        error: (error) => {
          console.error('Error fetching managers', error);
        }
      });
    }

    addManager(): void {
      const newManager = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
  
      this.managerService.addManager(newManager, this.token).subscribe({
        next: (response) => {
          console.log(response)
          this.showMessage('Manager ajouté avec succès!', 'success');
          this.fetchManagers();
          this.resetForm(); 
        },
        error: (error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } 
          else {
            this.showMessage('Erreur lors de la création du Manager.', 'error');
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
      this.managerToUpdate = null;
    }

    // pagination
    getPages(): number[] {
      const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
      return Array(pageCount).fill(0).map((_, index) => index + 1);
    }
  
    changePage(page: number): void {
      this.currentPage = page;
      this.fetchManagers();
    }
  
    changeItemsPerPage(itemsPerPage: number): void {
      const firstItemOfCurrentPage = (this.currentPage - 1) * this.itemsPerPage;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = Math.ceil((firstItemOfCurrentPage + 1) / this.itemsPerPage);
      this.fetchManagers();
    }

    // filters
    searchmanagers(): void {
      this.currentPage = 1; // Réinitialiser la page actuelle lors de la recherche
      this.fetchManagers();
    }

    // update mechanic
    updateManager(): void {
      if (this.managerToUpdate) {
        this.managerService.updateManager(this.managerToUpdate, this.token).subscribe({
          next: () => {
            this.fetchManagers();
            this.activeModalUpdate.close()
          },
          error: (error) => {
            console.error('Error updating vehicle:', error);
          }
        });
      }
    }

    disableManager(): void {
      if (this.managerToUpdate) {
        console.log(this.managerToUpdate)
        this.managerService.disableManager(this.managerToUpdate, this.token).subscribe({
          next: () => {
            this.fetchManagers();
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
      this.managerToUpdate = mechanic;
    }

    openModalDisable(contentModalDisable: TemplateRef<any>, mechanic: User) {
      this.activeModalUpdate = this.modalService.open(contentModalDisable, { centered: true });
      this.managerToUpdate = mechanic;
    }

    getManagerIdFromLocalStorage(): string | null {
      const user = localStorage.getItem('user');
      
      if (user) {
        const parsedUser: UserProfile = JSON.parse(user);
        return parsedUser._id;
      }
      
      return null;
    }
}
