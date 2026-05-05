import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  imports: [],
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.css',
})
export class RatingStarsComponent {
  readonly rating = input<number>(0);
  readonly readonly = input<boolean>(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showLabel = input<boolean>(false);
  readonly onRatingChange = output<number>();

  readonly stars = [1, 2, 3, 4, 5];

  getStarClass(star: number): string {
    if (star <= Math.floor(this.rating())) return 'text-yellow-500';
    if (star - 0.5 <= this.rating()) return 'text-yellow-500/50';
    return 'text-muted';
  }

  setRating(star: number): void {
    if (!this.readonly()) {
      this.onRatingChange.emit(star);
    }
  }

  getSizeClass(): string {
    return this.size() === 'sm' ? 'text-sm' : this.size() === 'lg' ? 'text-2xl' : 'text-lg';
  }
}
