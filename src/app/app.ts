import { Component, effect, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppStore } from './services/app-store.service';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { AuthModalComponent } from './components/shared/auth-modal/auth-modal.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, AuthModalComponent, ConfirmModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  constructor(public store: AppStore) {
    effect(() => {
      const theme = this.store.theme();
      if (isPlatformBrowser(this.platformId)) {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  get showSidebar(): boolean {
    return !this.router.url.includes('/login') && !this.router.url.includes('/register');
  }
}
