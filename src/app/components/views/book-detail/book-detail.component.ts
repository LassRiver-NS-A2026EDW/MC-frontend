import { Component, computed, inject, signal } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { UiStore } from '../../../services/ui.store';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, Heart, Star, Calendar, BookOpen, Globe, Building2, LogIn } from 'lucide-angular';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars.component';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-book-detail',
  imports: [FormsModule, LucideAngularModule, EmptyStateComponent, RatingStarsComponent, StatusBadgeComponent],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent {
  readonly store = inject(AppStore);
  readonly ui = inject(UiStore);
  readonly router = inject(Router);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly HeartIcon = Heart;
  readonly StarIcon = Star;
  readonly CalendarIcon = Calendar;
  readonly BookOpenIcon = BookOpen;
  readonly GlobeIcon = Globe;
  readonly Building2Icon = Building2;
  readonly LogInIcon = LogIn;

  rating = signal(5);
  comment = signal('');

  get selectedBook() { return this.store.selectedBook(); }
  get currentUser() { return this.store.currentUser(); }

  readonly bookReviews = computed(() => {
    return this.store.reviews().filter(r => String(r.bookId) === String(this.selectedBook?.id));
  });

  readonly userReview = computed(() => {
    return this.bookReviews().find(r => String(r.userId) === String(this.currentUser?.id));
  });

  goBack(): void {
    this.router.navigate(['/catalog']);
  }

  handleSubmitReview(): void {
    const book = this.selectedBook;
    const user = this.currentUser;
    if (!user || !book) return;
    if (!this.comment().trim()) return;
    
    this.store.addReview({
      bookId: book.id,
      userId: user.id,
      userName: user.name,
      rating: this.rating(),
      comment: this.comment(),
      flagged: false,
    });
    this.comment.set('');
    this.rating.set(5);
  }

  handleDeleteReview(): void {
    const review = this.userReview();
    if (review) {
      this.ui.confirmAction({
        title: 'Eliminar reseña',
        description: '¿Estás seguro que deseas eliminar esta reseña? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        isDestructive: true,
        onConfirm: () => {
          this.store.deleteReview(String(review.id));
        }
      });
    }
  }

  handleFavoriteToggle(): void {
    const book = this.selectedBook;
    if (book) {
      this.store.toggleFavorite(String(book.id));
    }
  }

  handleReserve(): void {
    const book = this.selectedBook;
    if (book) {
      if (this.store.isAuthenticated()) {
        // Here we would implement the real reservation logic or call an API endpoint.
        // For now, we could just alert or show a success message.
        alert(`Has reservado "${book.title}" exitosamente.`);
        return;
      }
      this.ui.openAuthModal('Debes iniciar sesión para reservar un libro.');
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
