import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { LucideAngularModule, Home, BookOpen, Heart, MessageSquare, User, LayoutDashboard, Menu } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  private router = inject(Router);

  constructor(public store: AppStore) {}

  readonly MenuIcon = Menu;

  navItems = [
    { id: 'home', label: 'Inicio', icon: Home, roles: ['all'] },
    { id: 'catalog', label: 'Catálogo', icon: BookOpen, roles: ['all'] },
    { id: 'favorites', label: 'Favoritos', icon: Heart, roles: ['user', 'librarian', 'admin'] },
    {
      id: 'reviews',
      label: 'Reseñas',
      icon: MessageSquare,
      roles: ['user', 'librarian', 'admin'],
    },
    { id: 'profile', label: 'Perfil', icon: User, roles: ['user', 'librarian', 'admin'] },
    { id: 'admin', label: 'Administración', icon: LayoutDashboard, roles: ['admin', 'librarian'] },
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
