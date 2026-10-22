import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  // Initialize the signal safely by checking the platform first
  isAuthenticated = signal<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    // Only access localStorage if we are running in the user's browser
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('admin_token');
    }
    return false; // Default to logged out during server-side rendering
  }

  login(password: string): boolean {
    if (password === 'admin123') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('admin_token', 'mock-jwt-token');
      }
      this.isAuthenticated.set(true);
      this.router.navigate(['/admin/projects']);
      return true;
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('admin_token');
    }
    this.isAuthenticated.set(false);
    this.router.navigate(['/admin/login']);
  }
}
