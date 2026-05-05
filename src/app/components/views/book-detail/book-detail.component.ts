import { Component } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent {
  constructor(public store: AppStore, private router: Router) {}

  get book() { return this.store.selectedBook(); }
  get reviews() { return this.store.reviews().filter(r => r.bookId === this.book?.id); }
  get isFavorite() { return this.book ? this.store.isFavorite(this.book.id) : false; }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }
}
