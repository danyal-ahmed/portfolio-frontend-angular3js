import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  template: `
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 ">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <span class="text-green-400">#</span> Manage Projects
        </h2>
        <button
          class="bg-green-500/10 text-green-400 border border-green-500/30 px-4 py-2 rounded text-sm hover:bg-green-500/20 transition-colors"
        >
          + Add New Project
        </button>
      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto rounded-lg border border-slate-800">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead
            class="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-xs"
          >
            <tr>
              <th class="p-4">Project Name</th>
              <th class="p-4">Status</th>
              <th class="p-4">Tech Stack</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/50">
            <!-- Mock Loop: Replace with @for (project of projects(); track project.id) -->
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="p-4 font-medium text-slate-200">DealSense Platform</td>
              <td class="p-4">
                <span
                  class="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs border border-green-500/20"
                  >Production</span
                >
              </td>
              <td class="p-4 text-slate-400">Node.js, LLMs, Elasticsearch</td>
              <td class="p-4 text-right space-x-3">
                <button class="text-blue-400 hover:text-blue-300">Edit</button>
                <button class="text-red-400 hover:text-red-300">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ProjectsAdmin {
  private adminService = inject(AdminService);
  projects = signal<any[]>([]);

  ngOnInit() {
    // this.adminService.getProjects().subscribe(data => this.projects.set(data));
  }
}
