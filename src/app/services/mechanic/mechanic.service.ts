import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  constructor(private apiService: ApiService) { }

  getMechanics(page: number = 1, limit: number = 10, search: string = '', status: string = '', token: string): Observable<unknown> {
    const url = `/mechanics`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search,
      status
    };
    return this.apiService.get<unknown>(url, params, token);
  }

  getActiveMechanics(page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
    const url = `/mechanics/active`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      filter: filter
    };
    return this.apiService.get<unknown>(url, params);
  }

  addMechanic(mechanicData: unknown, token: string): Observable<unknown> {
    const url = '/mechanics';
    return this.apiService.post(url, mechanicData, token);
  }

  updateMechanic(mechanic: User, token: string): Observable<unknown> {
    const url = `/mechanics/${mechanic._id}`;
    return this.apiService.put(url, mechanic, token);
  }
}
