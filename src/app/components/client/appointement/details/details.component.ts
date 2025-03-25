import { Component, OnInit } from '@angular/core';
import { NgbRatingModule  } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AppointmentDetailResponse } from 'src/app/models/appointment.model';
import { formatDate } from 'src/app/utils/utils.function';

@Component({
  selector: 'app-details',
  imports: [NgbRatingModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})


export class DetailsComponent implements OnInit {
	appointmentId: string | null = null;
	appointmentDetailResponse: AppointmentDetailResponse = null;
	rating = 2
	maxRate = 5
	ctrl = new FormControl<number | null>(null, Validators.required);

	formatDate = formatDate;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private appointmentService: AppointmentService
	){}

	ngOnInit(): void {

		this.route.paramMap.subscribe(params => {
			this.appointmentId = params.get('appointmentId');
			if (this.appointmentId) {
				this.fetchAppointmentDetails(this.appointmentId);
			}
		});
	}

	fetchAppointmentDetails(appointmentId: string){
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
}
