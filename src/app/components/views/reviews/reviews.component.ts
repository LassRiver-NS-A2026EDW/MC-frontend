import { Component, signal } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  imports: [FormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class ReviewsComponent {
  newComment = signal('');
  newRating = signal(5);
  selectedBookId = signal('');
  showForm = signal(false);

  constructor(public store: AppStore) {}

  get userReviews() {
    return this.store.userReviews();
  }
  get books() {
    return this.store.books();
  }

  submitReview(): void {
    const user = this.store.currentUser();
    if (!user || !this.selectedBookId() || !this.newComment()) return;
    this.store.addReview({
      bookId: this.selectedBookId(),
      userId: user.id,
      userName: user.name,
      rating: this.newRating(),
      comment: this.newComment(),
      flagged: false,
    });
    this.newComment.set('');
    this.newRating.set(5);
    this.selectedBookId.set('');
    this.showForm.set(false);
  }

  deleteReview(reviewId: string): void {
    if (confirm('¿Eliminar esta reseña?')) {
      this.store.deleteReview(reviewId);
    }
  }
}
