import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  appointmentId :string | null = null
  appointmentDetailResponse: AppointmentDetailResponse = null
  token: string

  // Commentaires
  comments: CommentModel[] = []
  newComment: string
	successMessage: string = '';
	errorMessage: string = '';

  // Interventions
  interventions: InterventionModel[] = null
	interventionOtherDetail =  {
		progress  : 0,
		totalCost : 0
	}

  // Utils
  formatDate = formatDate;
  
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService ,
    private interventionService: InterventionService,
    private commentService: CommentService,
    private authService: AuthService 
  ){
    this.token = authService.getToken();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
			this.appointmentId = params.get('appointmentId');
			if (this.appointmentId) {
				this.fetchAppointmentDetails(this.appointmentId);
				this.fetchInterventions();

				// Other details about intervention
				this.fetchTotalCost()
				this.fetchProgress()
			}
      this.fetchComments()
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

	fetchComments() {
		this.commentService.getComments(this.appointmentId, this.token).subscribe({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			next: (response: any) => {
				const result = response;
				this.comments = result.items || [];
			},
			error: (error) => {
				console.error('Error fetching vehicles:', error);
			}
		});
	}

  	resetForm(): void {
		this.newComment = '';
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

	addComment(): void {
		this.commentService.addComment(this.appointmentId, this.newComment, this.token).subscribe({
			next: (response) => {
				console.log('Comments added successfully:', response);
				this.showMessage('Commentaire ajouté avec succès!', 'success');
				this.fetchComments(); // Refresh the vehicle list
				this.resetForm(); // Optionally reset the form after submission
			},
			error: (error) => {
				this.showMessage('Erreur lors de l\'ajout du commentaire.', 'error');
				console.error('Error adding Comments:', error);
			}
		});
	}
}
