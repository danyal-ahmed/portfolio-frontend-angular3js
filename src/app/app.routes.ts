import { Routes } from '@angular/router';
// Import your standalone components
import { ProjectCardComponent } from './components/project/project-card.component';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';

export const routes: Routes = [
  // Default route redirects to projects
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Map paths to components
  { path: 'home', component: Home },
  { path: 'projects', component: ProjectCardComponent },
  { path: 'contact', component: Contact },
  // Wildcard route catches invalid URLs and redirects safely
  { path: '**', redirectTo: 'projects' },
];
