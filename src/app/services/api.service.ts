import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  get<T>(url: string, params?: { [key: string]: string | number | boolean }, token?: string): Observable<T> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};  // If a token is provided, add it to the headers
  
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      params,
      headers  // Pass headers as part of the options
    });
  }

  post(url: string, body: unknown, token?: string): Observable<unknown> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};  // If a token is provided, add it to the headers
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    
    return this.http.post<unknown>(`${this.baseUrl}${url}`, body, httpOptions); // Ensure body is second, headers as part of options
  }
  

  patch<T>(url: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body);
  }

  delete(url: string, token?: string): Observable<unknown> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};  // Include token if available
    return this.http.delete<unknown>(`${this.baseUrl}${url}`, { headers });
  }
  
}
