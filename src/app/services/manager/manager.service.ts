import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private apiService: ApiService) { }

  assignMechanicToAppointment(mechanicId: string, appointmentId: string, token: string): Observable<unknown> {
    const url = `/managers/appointments/assign/${appointmentId}/mechanic/${mechanicId}`;  // API endpoint for getting clients
    return this.apiService.patch<unknown>(url, {}, token);  // Call ApiService's get method
  }
}
