import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private apiService: ApiService) { }

  getAppointmentsAll(token: string): Observable<unknown> {
    const url = `/appointments`;
    const params = {
    };
    return this.apiService.get<unknown>(url,params,token);
  }

  getAppointments(token: string,page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
    const url = `/appointments`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      name: filter
    };
    return this.apiService.get<unknown>(url,params);
  }

  addAppointment(appointments: unknown, token: string): Observable<unknown> {
    const url = `/appointments`;
    return this.apiService.post(url, appointments, token);
  }

  getAppointmentsByClient(
    token: string, 
    vehicleName: string = '',
    status: string = '', 
    startDate: string = '', 
    endDate: string ='',
    page: number = 1,
    limit: number = 3
  ): Observable<unknown> {
    const url = `/appointments/by-client`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      vehicleName: vehicleName,
      status: status,
      startDate: startDate,
      endDate: endDate
    };
    return this.apiService.get<unknown>(url,params);
  }

}
