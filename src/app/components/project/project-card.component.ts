// projects.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-4xl mx-auto my-12 font-mono">
      <div
        class="flex items-center justify-between mb-6 text-xs text-terminal-muted border-b border-terminal-border pb-2"
      >
        <span>Selected projects</span>
        <span>$ ls -al /projects/</span>
      </div>

      <div class="space-y-6">
        @for (project of projects; track project.id) {
          <div
            class="group border border-terminal-border bg-terminal-card p-5 rounded-lg hover:border-gray-500 transition-all"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-3">
                <span class="text-xs text-terminal-muted font-mono">[{{ project.id }}]</span>
                <h3
                  class="text-base font-bold text-gray-100 group-hover:text-green-400 transition-colors"
                >
                  {{ project.title }}
                </h3>
              </div>
              <span class="text-xs bg-terminal-border px-2 py-0.5 rounded text-gray-300">
                {{ project.year }} · {{ project.role }}
              </span>
            </div>
            <p class="text-sm text-gray-400 mb-4 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex items-center gap-4 text-xs">
              <span class="text-terminal-muted">stack: TS / Node / WS</span>
              @if (project.link) {
                <a
                  [href]="project.link"
                  target="_blank"
                  class="text-green-400 hover:underline flex items-center gap-1"
                >
                  view live ↗
                </a>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ProjectCardComponent {
  projects: Project[] = [
    {
      id: '01',
      title: 'Thrust - Crypto Social Trading Platform',
      description:
        'Crypto social trading platform featuring sub-100ms WebSocket price updates, live DMs, and bonding curve token trading.',
      year: '2025',
      role: 'Fullstack Engineer',
      link: 'https://akkila.dev',
    },
    {
      id: '02',
      title: 'FudbalLive - Live Football Prediction App',
      description:
        'Real-time social football prediction app for friend groups. Led 3 engineers from scratch to live on both App Store and Google Play.',
      year: '2023',
      role: 'Frontend Lead',
      link: 'https://akkila.dev',
    },
  ];
}
