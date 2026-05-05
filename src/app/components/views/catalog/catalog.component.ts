import { Component } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent {
  constructor(public store: AppStore, private router: Router) {}

  readonly categories = ['Ficción', 'Romance', 'Clásicos', 'Misterio', 'Cuentos', 'Ficción Psicológica'];
  readonly languages = ['Español'];
  readonly ratingOptions = [
    { value: 'all', label: 'Todos' },
    { value: '4', label: '4+ Estrellas' },
    { value: '3', label: '3+ Estrellas' },
    { value: '2', label: '2+ Estrellas' },
  ];

  viewBookDetail(bookId: string): void {
    const book = this.store.books().find(b => b.id === bookId);
    if (book) {
      this.store.selectBook(book);
      this.router.navigate(['/book-detail']);
    }
  }
}
