// File: data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8088'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/patient`);
  }

  getDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/patient/${id}`);
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/api/patient/`, data, { headers });
  }

  updateData(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.baseUrl}/api/patient/${id}`, data, { headers });
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/patient/${id}`);
  }
}
