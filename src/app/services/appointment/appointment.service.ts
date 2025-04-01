import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private apiService: ApiService) { }

  getAppointmentsAll(
    token: string, 
    page: number = 1, 
    limit: number = 10,
    search: string = '',
    status = '',
    serviceTypeId = '',
    startDate = '',
    endDate = ''
  ): Observable<unknown> {
    const url = `/appointments/all`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
      serviceTypeId,
      startDate,
      endDate
    };
    return this.apiService.get<unknown>(url,params,token);
  }

  getAppointments(token: string, page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
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
    limit: number = 10,
    page: number = 1,
    vehicleName: string = '',
    serviceTypeId: string = '' ,
    status: string = '', 
    startDate: string = '', 
    endDate: string =''
  ): Observable<unknown> {
    const url = `/appointments/by-client`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search: vehicleName,
      serviceTypeId: serviceTypeId,
      status: status,
      startDate: startDate,
      endDate: endDate
    };
    return this.apiService.get<unknown>(url,params);
  }

  getAppointmentsByMechanic(
    token: string, 
    limit: number = 10,
    page: number = 1,
    search: string = '',
    serviceTypeId: string = '' ,
    status: string = '', 
    startDate: string = '', 
    endDate: string =''
  ): Observable<unknown> {
    const url = `/appointments/by-mechanic`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search: search,
      serviceTypeId: serviceTypeId,
      status: status,
      startDate: startDate,
      endDate: endDate
    };
    return this.apiService.get<unknown>(url,params);
  }

  getAppointmentById(
    appointmentId: string = ''
  ): Observable<unknown> {
    const url = `/appointments/id/${appointmentId}`;
    return this.apiService.get<unknown>(url);
  }
  
  addAppointmentScore(appointmentId: string, score: number, token: string): Observable<unknown> {
    const url = `/appointment-scores/`;
    const body = {appointmentId, score}
    return this.apiService.post(url, body, token);
  }

  getAppointmentScore(appointmentId: string = ''): Observable<unknown> {
    const url = `/appointment-scores/appointments/${appointmentId}`;
    return this.apiService.get<unknown>(url);
  }

  getAppointmentScoreGeneralAvg(): Observable<unknown> {
    const url = `/appointment-scores/average/general`;
    return this.apiService.get<unknown>(url);
  }

  cancel(appointmentId: string, token: string): Observable<unknown>{
    const url = `/appointments/${appointmentId}/cancel`
    return this.apiService.delete(url,token)
  }
}
