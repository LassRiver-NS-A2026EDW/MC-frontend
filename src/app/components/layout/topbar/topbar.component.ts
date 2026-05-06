import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { LucideAngularModule, Search, Bell, Sun, Moon, LogOut } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent {
  readonly router = inject(Router);

  constructor(public store: AppStore) {}

  readonly SearchIcon = Search;
  readonly BellIcon = Bell;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly LogOutIcon = LogOut;

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setSearchQuery(target.value);
  }

  handleNotifications(): void {
    this.store.requireAuth(() => {
      // Implement notifications logic later
      alert('Bandeja de notificaciones');
    }, 'Debes iniciar sesión para ver tus notificaciones.');
  }

  handleLogout(): void {
    this.store.confirmAction({
      title: 'Cerrar sesión',
      description: '¿Estás seguro que deseas cerrar sesión?',
      confirmText: 'Cerrar sesión',
      isDestructive: true,
      onConfirm: () => {
        this.store.logout();
        this.router.navigate(['/home']);
      }
    });
  }
}
