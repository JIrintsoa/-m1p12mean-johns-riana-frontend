import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,  } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDetailResponse } from 'src/app/models/appointment.model';
import { CommentModel } from 'src/app/models/comment.model';
import { InterventionModel } from 'src/app/models/interventions.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { InterventionService } from 'src/app/services/intervention/intervention.service';
import { formatDate } from 'src/app/utils/utils.function';

@Component({
  selector: 'app-details',
  imports: [FormsModule,CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  token: string;
  appointmentId: string = '';
  appointmentDetailResponse: AppointmentDetailResponse = null;
  comments: CommentModel[] = []
  newComment: string
  successMessage: string = '';
  errorMessage: string = '';

  // interventions
  interventions: InterventionModel[] = null;
  interventionInput = {
    name :'',
    cost: 0 
  }
  interventionOtherDetail =  {
    progress  : 0,
    totalCost : 0
  }

  formatDate = formatDate

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeModalFinish: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeModaleSkip: any;

  interventIdFromModal: string = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalFinish') contentModalFinish: TemplateRef<any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('contentModalSkip') contentModalSkip: TemplateRef<any> | undefined;


  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private interventionService: InterventionService,
    private modalService: NgbModal
  ) {
    this.token = authService.getToken();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
			this.appointmentId = params.get('appointmentId');
			if (this.appointmentId) {
				this.fetchAppointmentDetails(this.appointmentId);
        this.fetchComments();
        this.fetchInterventions();

        // Other details about intervention
        this.fetchTotalCost()
        this.fetchProgress()
			}
		});
  }

  fetchAppointmentDetails(appointmentId: string) {
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: AppointmentDetailResponse) => {
        this.appointmentDetailResponse = response
      },
      error: (error) => {

        console.error('Error fetching vehicles:', error);
      }
    })
  }

  fetchComments() {
    this.commentService.getComments(this.appointmentId, this.token).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        const result = response;
        this.comments = result.items || [];
      },
      error: (error) => {
        console.error('Error fetching Comments:', error);
      }
    });
  }

  fetchTotalCost(){
    this.interventionService.totalCostByAppointmentId(this.appointmentId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        // console.log(response.totalCost)
        this.interventionOtherDetail.totalCost = response.totalCost
      },
      error: (error) => {
        console.error('Error fetching totalCost:', error);
      }
    })
  }

  fetchProgress(){
    this.interventionService.progressionByAppointmentId(this.appointmentId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.interventionOtherDetail.progress = response.progress
      },
      error: (error) => {
        console.error('Error fetching progress:', error);
      }
    })
  }

  addComment(): void {
    this.commentService.addComment(this.appointmentId, this.newComment, this.token).subscribe({
      next: (response) => {
        console.log('Vehicle added successfully:', response);
        this.showMessage('Véhicule ajouté avec succès!', 'success');
        this.fetchComments(); // Refresh the vehicle list
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        this.showMessage('Erreur lors de l\'ajout du véhicule.', 'error');
        console.error('Error adding vehicle:', error);
      }
    });
  }

  // Add and list intervention
  fetchInterventions(){
    this.interventionService.getInterventions(this.appointmentId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.interventions = response.items
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    })
  }

  addIntervention(){
    this.interventionService.addIntervention(
      this.token,
      this.appointmentId,
      this.interventionInput.name,
      this.interventionInput.cost
    ).subscribe({
      next: (response) => {
        console.log('Intervention added successfully:', response);
        this.showMessage('Intervention ajouté avec succès!', 'success');
        this.fetchInterventions(); // Refresh the vehicle list
        window.location.reload(); // Refresh the page to reflect changes
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        this.showMessage('Erreur lors de l\'ajout de l\'intervention.', 'error');
        console.error('Error adding intervention:', error);
      }
    })
  }

  // Check and skip intervention
  finishIntervention(){
    this.interventionService.finish(this.token,this.interventIdFromModal).subscribe({
      next: (response) => {
        console.log('Intervention finished:', response);
        this.showMessage('Intervention fini avec succès!', 'success');
        this.fetchInterventions(); // Refresh the vehicle list
        this.activeModalFinish.close();
        window.location.reload(); // Refresh the page to reflect changes
        // this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        this.showMessage('Erreur lors de l\'ajout du Intervention.', 'error');
        console.error('Error finishing intervention:', error);
      }
    })
  }
 
  skipIntervention(){
    this.interventionService.skip(this.token, this.interventIdFromModal).subscribe({
      next: (response) => {
        console.log('Intervention skipped successfully:', response);
        this.showMessage('Intervention skipper avec succès!', 'success');
        this.fetchInterventions(); // Refresh the vehicle list
        this.activeModaleSkip.close();
        window.location.reload(); // Refresh the page to reflect changes
        // this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        this.showMessage('Erreur lors du skip de d\'Intervention.', 'error');
        console.error('Error skipping intervention:', error);
      }
    })
  }

  resetForm(): void {
    this.newComment = '';
    this.interventionInput.name = '';
    this.interventionInput.cost = 0;
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    if(type === 'success') {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalFinish(contentModalFinish: TemplateRef<any>, interventionId: string) {
    this.activeModalFinish = this.modalService.open(contentModalFinish, { centered: true })
    // console.log(interventionId)
    this.interventIdFromModal = interventionId
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalSkip(contentModalSkip: TemplateRef<any>, interventionId: string) {
    this.activeModaleSkip = this.modalService.open(contentModalSkip, {centered: true})
    this.interventIdFromModal = interventionId
    console.log(interventionId)
  }
}

