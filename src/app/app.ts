import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Import your existing layout components
import { BackgroundAvatar } from './components/background-avatar/background-avatar';
import { Header } from './components/header/header';
import { Terminal } from './components/terminal/terminal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundAvatar, Header, Terminal],
  templateUrl: './app.html',
})
export class App {
  isAdminRoute = signal(false);
  isFocusMode = signal(false);

  constructor() {
    const router = inject(Router);

    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));
      });
  }

  toggleFocusMode() {
    this.isFocusMode.update((v) => !v);
  }
}
