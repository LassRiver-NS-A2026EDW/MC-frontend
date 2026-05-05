import { Component } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent {
  constructor(public store: AppStore, private router: Router) {}

  get favoriteBooks() { return this.store.favoriteBooks(); }

  viewBookDetail(bookId: string): void {
    const book = this.store.books().find(b => b.id === bookId);
    if (book) {
      this.store.selectBook(book);
      this.router.navigate(['/book-detail']);
    }
  }
}
