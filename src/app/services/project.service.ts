import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);

  readonly projects = signal<Project[]>([]);
  readonly isLoading = signal<boolean>(false); // <-- Make sure it is named isLoading
  readonly errorMessage = signal<string | null>(null);

  fetchProjects(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.get<Project[]>('/api/projects').subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
        this.errorMessage.set('Could not load projects. Please ensure the backend is running.');
        this.isLoading.set(false);
      },
    });
  }
}
