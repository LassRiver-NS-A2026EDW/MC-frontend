import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppStore } from './services/app-store.service';
import { UiStore } from './services/ui.store';
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
  private router = inject(Router);

  constructor(public store: AppStore, public ui: UiStore) {}

  get showSidebar(): boolean {
    return !this.router.url.includes('/login') && !this.router.url.includes('/register');
  }
}
