import { Routes } from '@angular/router';
// Import your standalone components
import { ProjectCardComponent } from './components/project/project-card.component';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { About } from './components/about/about';

export const routes: Routes = [
  // Default route redirects to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Map paths to components
  { path: 'home', component: Home },
  { path: 'projects', component: ProjectCardComponent },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },

  // LAZY LOADED ROUTES MUST GO BEFORE THE WILDCARD
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES) },

  // Wildcard route catches invalid URLs and redirects safely (MUST BE LAST)
  { path: '**', redirectTo: 'projects' },
];
