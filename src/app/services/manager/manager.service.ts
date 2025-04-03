import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private apiService: ApiService) { }

  assignMechanicToAppointment(mechanicId: string, appointmentId: string, token: string): Observable<unknown> {
    const url = `/managers/appointments/assign/${appointmentId}/mechanic/${mechanicId}`;  // API endpoint for getting clients
    return this.apiService.patch<unknown>(url, {}, token);  // Call ApiService's get method
  }

  getManagers(page: number = 1, limit: number = 10, search: string = '', status: string = '', token: string): Observable<unknown> {
    const url = `/managers`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search,
      status
    };
    return this.apiService.get<unknown>(url, params, token);
  }

  addManager(managerData: unknown, token: string): Observable<unknown> {
    const url = '/managers';
    return this.apiService.post(url, managerData, token);
  }

  updateManager(manager: User, token: string): Observable<unknown> {
    const url = `/managers/${manager._id}`;
    return this.apiService.put(url, manager, token);
  }

  disableManager(manager: User, token: string): Observable<unknown> {
    const url = `/managers/${manager._id}/inactive`;
    return this.apiService.patch(url, manager, token);
  }

}
