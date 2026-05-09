import { Component, computed, inject, signal } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Heart, Star, Search, Filter } from 'lucide-angular';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars.component';

@Component({
  selector: 'app-catalog',
  imports: [FormsModule, LucideAngularModule, EmptyStateComponent, RatingStarsComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent {
  readonly store = inject(AppStore);
  readonly router = inject(Router);

  showFilters = signal(true);

  readonly HeartIcon = Heart;
  readonly StarIcon = Star;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;

  get categories() {
    return ['all', ...Array.from(new Set(this.store.books().map((b) => b.category)))];
  }

  get languages() {
    return ['all', ...Array.from(new Set(this.store.books().map((b) => b.language)))];
  }

  readonly ratingOptions = [
    { value: 'all', label: 'Cualquier rating' },
    { value: '4', label: '4+ estrellas' },
    { value: '4.5', label: '4.5+ estrellas' },
    { value: '4.7', label: '4.7+ estrellas' },
  ];

  viewBookDetail(bookId: string | number): void {
    this.router.navigate(['/books', bookId]);
  }

  clearFilters(): void {
    this.store.setCategoryFilter('all');
    this.store.setLanguageFilter('all');
    this.store.setRatingFilter('all');
    this.store.setAvailabilityFilter('all');
    this.store.setSearchQuery('');
  }
}
