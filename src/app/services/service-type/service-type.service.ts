import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private apiService: ApiService) { }

  getServiceTypes(): Observable<unknown> {
    const url = `/service-types`;

    return this.apiService.get<unknown>(url);  // Call ApiService's get method
  }
}
