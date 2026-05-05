import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent {
  readonly router = inject(Router);

  constructor(public store: AppStore) {}

  getViewTitle(): string {
    const url = this.router.url;
    if (url.includes('/home')) return 'Inicio';
    if (url.includes('/catalog')) return 'Catálogo';
    if (url.includes('/book-detail')) return 'Detalle del Libro';
    if (url.includes('/favorites')) return 'Favoritos';
    if (url.includes('/reviews')) return 'Reseñas';
    if (url.includes('/profile')) return 'Perfil';
    if (url.includes('/admin')) return 'Administración';
    return 'LassRiver NS';
  }
}
