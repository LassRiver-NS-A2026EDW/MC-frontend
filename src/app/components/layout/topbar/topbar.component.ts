import { Component } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent {
  constructor(public store: AppStore) {}

  getViewTitle(): string {
    const titles: Record<string, string> = {
      home: 'Inicio',
      catalog: 'Catálogo',
      'book-detail': 'Detalle del Libro',
      favorites: 'Favoritos',
      reviews: 'Reseñas',
      profile: 'Perfil',
      admin: 'Administración',
    };
    return titles[this.store.currentView()] || 'LassRiver NS';
  }
}
