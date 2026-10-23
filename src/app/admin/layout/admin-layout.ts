// src/app/admin/layout/admin-layout.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- 1. Removed bg-slate-950 and added relative z-10 here -->
    <div class="min-h-screen flex font-mono text-slate-300 relative z-10">
      <!-- 2. Added backdrop-blur-md to the sidebar -->
      <aside class="w-64 border-r border-slate-800 bg-slate-900/50  flex flex-col">
        <div class="p-6 border-b border-slate-800">
          <div
            class="text-green-400 font-bold tracking-widest uppercase text-sm flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
            Akkila Admin
          </div>
        </div>

        <nav class="flex-1 p-4 space-y-2">
          <a
            routerLink="projects"
            routerLinkActive="bg-slate-800 text-green-400 border-l-2 border-green-500"
            class="block px-4 py-3 rounded text-sm hover:bg-slate-800/50 transition-colors"
          >
            > ./projects_crud
          </a>
          <a
            routerLink="home-content"
            routerLinkActive="bg-slate-800 text-green-400 border-l-2 border-green-500"
            class="block px-4 py-3 rounded text-sm hover:bg-slate-800/50 transition-colors"
          >
            > ./edit_home
          </a>
          <a
            routerLink="about-content"
            routerLinkActive="bg-slate-800 text-green-400 border-l-2 border-green-500"
            class="block px-4 py-3 rounded text-sm hover:bg-slate-800/50 transition-colors"
          >
            > ./edit_about
          </a>
          <a
            routerLink="messages"
            routerLinkActive="bg-slate-800 text-green-400 border-l-2 border-green-500"
            class="block px-4 py-3 rounded text-sm hover:bg-slate-800/50 transition-colors flex justify-between items-center"
          >
            <span>> ./messages</span>
            <span class="bg-slate-800 text-xs px-2 py-0.5 rounded text-slate-400">New</span>
          </a>
        </nav>

        <!-- Footer Actions -->
        <div class="p-4 border-t border-slate-800 space-y-4">
          <!-- Logout Action -->
          <button
            (click)="logout()"
            class="w-full text-left text-sm text-red-400/90 hover:text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded transition-colors flex items-center gap-2 font-bold"
          >
            <span>❯</span> ./exit.sh
          </button>

          <!-- Return Link -->
          <a
            routerLink="/"
            class="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-2 px-4 pb-2"
          >
            ← Return to public site
          </a>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-8 relative z-10">
        <div class="max-w-5xl mx-auto">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class AdminLayout {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
