import { Component, inject } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, MessageSquare, LogIn } from 'lucide-angular';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars.component';

@Component({
  selector: 'app-reviews',
  imports: [FormsModule, LucideAngularModule, EmptyStateComponent, RatingStarsComponent],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class ReviewsComponent {
  readonly store = inject(AppStore);
  readonly router = inject(Router);

  readonly MessageSquareIcon = MessageSquare;
  readonly LogInIcon = LogIn;

  get currentUser() { return this.store.currentUser(); }
  get userReviews() { return this.store.userReviews(); }
  get books() { return this.store.books(); }

  getBook(bookId: string | number) {
    return this.books.find(b => String(b.id) === String(bookId));
  }

  handleBookClick(bookId: string | number): void {
    const book = this.getBook(bookId);
    if (book) {
      this.store.selectBook(book);
      this.router.navigate(['/book-detail']);
    }
  }
}
