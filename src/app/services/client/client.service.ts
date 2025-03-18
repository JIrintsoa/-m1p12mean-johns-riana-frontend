import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiService: ApiService) { }

  getClients(page: number = 1, limit: number = 10, filter: string = ''): Observable<unknown> {
    const url = `/clients`;  // API endpoint for getting clients
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      filter: filter  // Optional filter parameter (if you want to search)
    };
    return this.apiService.get<unknown>(url,params);  // Call ApiService's get method
  }


  addClient(clientData: unknown): Observable<unknown> {
    const url = '/clients';  // API endpoint to add a new client
    return this.apiService.post(url, clientData);  // Call ApiService's post method
  }

  getVehicles(token: string): Observable<unknown> {
    const url = `/vehicles`;  // API endpoint for getting vehicles
    const params = {};
    return this.apiService.get<unknown>(url, params, token);  // Pass the token here
  }

  addVehicle(vehicle: unknown, token: string): Observable<unknown> {
    const url = `/vehicles`;
    return this.apiService.post(url, vehicle, token);
  }
}
