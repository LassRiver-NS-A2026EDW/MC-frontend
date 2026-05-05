import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  private router = inject(Router);

  constructor(public store: AppStore) {}

  navItems = [
    { id: 'home', label: 'Inicio', icon: 'home', roles: ['all'] },
    { id: 'catalog', label: 'Catálogo', icon: 'book-open', roles: ['all'] },
    { id: 'favorites', label: 'Favoritos', icon: 'heart', roles: ['user', 'librarian', 'admin'] },
    {
      id: 'reviews',
      label: 'Reseñas',
      icon: 'message-square',
      roles: ['user', 'librarian', 'admin'],
    },
    { id: 'profile', label: 'Perfil', icon: 'user', roles: ['user', 'librarian', 'admin'] },
    { id: 'admin', label: 'Admin', icon: 'layout-dashboard', roles: ['admin', 'librarian'] },
  ];

  canAccess(roles: string[]): boolean {
    if (roles.includes('all')) return true;
    if (!this.store.currentUser()) return false;
    return roles.includes(this.store.currentUser()!.role);
  }

  navigate(view: string): void {
    this.router.navigate([`/${view}`]);
  }

  isActive(view: string): boolean {
    return this.router.url === `/${view}` || this.router.url.startsWith(`/${view}`);
  }

  getUserInitial(): string {
    return this.store.currentUser()?.name?.charAt(0) || '?';
  }
}
