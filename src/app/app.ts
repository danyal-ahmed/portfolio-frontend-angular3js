import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { ProjectCardComponent } from './components/project/project-card.component';
import { BackgroundAvatar } from './components/background-avatar/background-avatar';
import { Terminal } from './components/terminal/terminal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectCardComponent, BackgroundAvatar, Terminal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly projectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.fetchProjects();
  }
}
