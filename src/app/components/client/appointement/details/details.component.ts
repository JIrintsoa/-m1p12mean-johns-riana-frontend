import { Component, OnInit } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AppointmentDetailResponse } from 'src/app/models/appointment.model';
import { formatDate } from 'src/app/utils/utils.function';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentModel } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { InterventionModel } from 'src/app/models/interventions.model';
import { InterventionService } from 'src/app/services/intervention/intervention.service';

@Component({
	selector: 'app-details',
	imports: [NgbRatingModule, ReactiveFormsModule, CommonModule, FormsModule],
	templateUrl: './details.component.html',
	styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
	token: string;
	appointmentId: string | null = null;
	appointmentDetailResponse: AppointmentDetailResponse = null;
	rating = 2
	maxRate = 5
	ctrl = new FormControl<number | null>(null, Validators.required);
	comments: CommentModel[] = []
	newComment: string
	successMessage: string = '';
	errorMessage: string = '';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	existingScore: any = null; // To store the existing score
	ratingSubmitted: boolean = false; 

	formatDate = formatDate;

	// Interventions
	interventions: InterventionModel[] = null
	interventionOtherDetail =  {
		progress  : 0,
		totalCost : 0
	}

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private appointmentService: AppointmentService,
		private commentService: CommentService,
		private authService: AuthService,
		private interventionService: InterventionService
	) {
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
		});
		this.fetchComments();
		this.fetchAppointmentScore();
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

	toggle() {
		if (this.ctrl.disabled) {
			this.ctrl.enable();
		} else {
			this.ctrl.disable();
		}
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

	addAppointmentScore() {
		const ratingValue = this.ctrl.value;
	
		// If no score exists, allow submission
		if (this.existingScore === null) {
		  if (ratingValue !== null && ratingValue >= 1 && ratingValue <= this.maxRate) {
			this.appointmentService.addAppointmentScore(this.appointmentId, ratingValue, this.token).subscribe({
			  next: (response) => {
				console.log('Score added successfully:', response);
				this.showMessage('Note ajouté avec succès!', 'success');
				this.fetchAppointmentScore(); // Fetch new score after submission
			  },
			  error: (error) => {
				this.showMessage('Erreur lors de l\'ajout de la note.', 'error');
				console.error('Error adding score:', error);
			  }
			});
		  } else {
			console.error('Invalid rating value');
		  }
		}
	  }

	// Fetch existing appointment score
	fetchAppointmentScore() {
		this.appointmentService.getAppointmentScore(this.appointmentId).subscribe({
		  // eslint-disable-next-line @typescript-eslint/no-explicit-any
		  next: (response: any) => {
			const result = response;
			this.existingScore = result.items.length > 0 ? result.items[0].score : null;  // Store existing score
			this.ratingSubmitted = this.existingScore !== null; // Check if rating exists
			if (this.ratingSubmitted) {
			  this.ctrl.setValue(this.existingScore); // Set the existing score value
			  this.ctrl.disable(); // Disable the control once submitted
			}
		  },
		  error: (error) => {
			console.error('Error fetching appointment score:', error);
		  }
		});
	  }
}
