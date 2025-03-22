import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private apiService: ApiService) { }

  getAppointments(token: string,page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
    const url = `/appointments`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      filter: filter
    };
    return this.apiService.get<unknown>(url,params);
  }

  addAppointment(appointments: unknown, token: string): Observable<unknown> {
    const url = `/appointments`;
    return this.apiService.post(url, appointments, token);
  }

}
