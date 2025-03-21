import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private apiService: ApiService) { }

  getAppointmentsAll(token: string): Observable<unknown> {
    const url = `/appointments/all`;
    const params = {};
    return this.apiService.get<unknown>(url, params, token);
  }

}
