import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ServiceType } from 'src/app/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private apiService: ApiService) { }

  getServiceTypes(search: string = ''): Observable<unknown> {
    const params = {
      search: search
    }
    console.log(params)
    const url = `/service-types`;

    return this.apiService.get<unknown>(url);  // Call ApiService's get method
  }

  add(serviceType: unknown, token: string): Observable<unknown> {
    const url = '/service-types';
    return this.apiService.post(url, serviceType, token);
  }

  updateServiceType(serviceType: ServiceType, token: string): Observable<unknown> {
    const url = `/service-types/${serviceType._id}`;
    return this.apiService.put(url, serviceType, token);
  }

  disableServiceType(serviceType: ServiceType, token: string): Observable<unknown> {
    const url = `/service-types/disable/${serviceType._id}`;
    return this.apiService.patch(url, serviceType, token);
  }
}
