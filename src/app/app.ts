import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { ProjectCardComponent } from './components/project/project-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly projectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.fetchProjects();
  }
}
