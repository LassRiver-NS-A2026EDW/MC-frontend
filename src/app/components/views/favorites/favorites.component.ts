import { Component, inject } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { AuthStore } from '../../../services/auth.store';
import { Router } from '@angular/router';
import { LucideAngularModule, Heart, LogIn } from 'lucide-angular';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars.component';

@Component({
  selector: 'app-favorites',
  imports: [LucideAngularModule, EmptyStateComponent, RatingStarsComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent {
  readonly store = inject(AppStore);
  readonly auth = inject(AuthStore);
  readonly router = inject(Router);

  readonly HeartIcon = Heart;
  readonly LogInIcon = LogIn;

  get favoriteBooks() { return this.store.favoriteBooks(); }

  viewBookDetail(bookId: string | number): void {
    this.router.navigate(['/books', bookId]);
  }
}
