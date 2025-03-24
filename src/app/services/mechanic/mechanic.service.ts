import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  constructor(private apiService: ApiService) { }

  getMechanics(page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
    const url = `/mechanics`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      filter: filter 
    };
    return this.apiService.get<unknown>(url,params);
  }

  getActiveMechanics(page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
    const url = `/mechanics/active`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      filter: filter 
    };
    return this.apiService.get<unknown>(url,params);
  }

  addMechanic(mechanicData: unknown): Observable<unknown> {
    const url = '/mechanics';
    return this.apiService.post(url, mechanicData);
  }
}
