import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { VehicleModel } from 'src/app/models/vehicle.model';

@Injectable({
  providedIn: 'root', // This ensures that the service is available globally in the app
})

export class VehicleService {

  constructor(private apiService: ApiService) { }

  getVehicles(token: string, page: number = 1, limit: number = 3, filter: string = '', order: string = 'desc'): Observable<unknown> {
    const url = `/vehicles`;  // API endpoint for getting vehicles
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      name: filter,
      order: order
    };
    return this.apiService.get<unknown>(url, params, token);  // Pass the token here
  }

  addVehicle(vehicle: unknown, token: string): Observable<unknown> {
    const url = `/vehicles`;
    return this.apiService.post(url, vehicle, token);
  }

  deleteVehicle(vehicleId: string, token: string): Observable<unknown> {
    const url = `/vehicles/id/${vehicleId}`;  // Assuming the backend expects the vehicleId in the URL
    return this.apiService.delete(url, token);  // Use your API service to send a DELETE request
  }
  
  updateVehicle(vehicle: VehicleModel, token: string): Observable<unknown> {
    const url = `/vehicles/${vehicle._id}`;
    return this.apiService.put(url, vehicle, token);
  }
}
