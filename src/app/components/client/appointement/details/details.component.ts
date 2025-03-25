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

	formatDate = formatDate;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private appointmentService: AppointmentService,
		private commentService: CommentService,
		private authService: AuthService,
	) {
		this.token = authService.getToken();
	}

	ngOnInit(): void {

		this.route.paramMap.subscribe(params => {
			this.appointmentId = params.get('appointmentId');
			if (this.appointmentId) {
				this.fetchAppointmentDetails(this.appointmentId);
			}
		});
		this.fetchComments();
	}

	fetchAppointmentDetails(appointmentId: string) {
		this.appointmentService.getAppointmentById(appointmentId).subscribe({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			next: (response: AppointmentDetailResponse) => {
				// console.log('Raw response:', response);
				// const result = response;
				this.appointmentDetailResponse = response
				// console.log(result)
				// console.log(result)
				// this.appointmentDetail = result.items || [];
				// console.log(this.appointmentDetail)
				// console.log('Processed vehicles:', this.vehicles);
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
	fetchComments() {
		this.commentService.getComments(this.appointmentId, this.token).subscribe({
			next: (response: any) => {
				const result = response;
				this.comments = result.items || [];
			},
			error: (error) => {
				console.error('Error fetching vehicles:', error);
			}
		});
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
