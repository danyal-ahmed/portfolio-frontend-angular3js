import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { BackgroundAvatar } from './components/background-avatar/background-avatar';
import { Terminal } from './components/terminal/terminal';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundAvatar, Terminal, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly projectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.fetchProjects();
  }
}
