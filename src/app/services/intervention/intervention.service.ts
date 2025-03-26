import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private apiService: ApiService) { }

  getInterventions(appointmentId: string): Observable<unknown> {
    const url = `/interventions/appointments/${appointmentId}`;  // API endpoint for getting clients
    return this.apiService.get<unknown>(url);  // Call ApiService's get method
  }

  addIntervention(token:string = '',appointmentId: string = '', name:string ='', cost:number = 0){
    const url = `/interventions/`
    const body = {
      appointmentId: appointmentId,
      name: name,
      cost: cost
    }

    return this.apiService.post(url,body,token)
  }
  finish(token: string, interventionId: string): Observable<unknown> {
    const url = `/interventions/finish/${interventionId}`;  // API endpoint for getting clients
    return this.apiService.patch<unknown>(url, {}, token);  // Call ApiService's get method
  }

  skip(token: string, interventionId: string): Observable<unknown> {
    const url = `/interventions/skip/${interventionId}`;  // API endpoint for getting clients
    return this.apiService.patch<unknown>(url, {}, token);  // Call ApiService's get method
  }

  totalCostByAppointmentId(appointmentId: string){
    const url = `/interventions/appointments/${appointmentId}/total-cost`
    return this.apiService.get(url)
  }

  progressionByAppointmentId(appointmentId: string){
    const url = `/interventions/appointments/${appointmentId}/progress`
    return  this.apiService.get(url)
  }
}

