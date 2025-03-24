import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiService: ApiService) { }

  getComments(appointmentId: string ='', token: string): Observable<unknown> {
    const url = `/comments/appointments/${appointmentId}`;
    const params = {
    };
    return this.apiService.get<unknown>(url, params, token);
  }

  addComment(appointmentId: string = '', comment: string, token: string): Observable<unknown> {
    const url = `/comments/`;
    const body = {
      appointmentId,
      comment
    }
    return this.apiService.post(url, body, token);
  }
}
