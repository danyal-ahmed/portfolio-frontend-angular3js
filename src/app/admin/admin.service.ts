import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1'; // Replace with your Node.js/NestJS endpoint

  // --- Projects CRUD ---
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }
  createProject(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, data);
  }
  updateProject(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/projects/${id}`, data);
  }
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${id}`);
  }

  // --- Content Management (Home / About) ---
  getContent(page: 'home' | 'about'): Observable<any> {
    return this.http.get(`${this.apiUrl}/content/${page}`);
  }
  updateContent(page: 'home' | 'about', data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/content/${page}`, data);
  }

  // --- Contact Messages ---
  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages`);
  }
  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/messages/${id}`);
  }
}
