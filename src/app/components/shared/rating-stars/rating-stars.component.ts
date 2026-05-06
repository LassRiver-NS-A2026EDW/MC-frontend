import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-rating-stars',
  imports: [LucideAngularModule],
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.css',
})
export class RatingStarsComponent {
  readonly rating = input<number>(0);
  readonly readonly = input<boolean>(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showLabel = input<boolean>(false);
  readonly onRatingChange = output<number>();

  readonly StarIcon = Star;
  readonly stars = [1, 2, 3, 4, 5];

  getStarClass(star: number): string {
    if (star <= Math.floor(this.rating())) return 'fill-yellow-400 text-yellow-400';
    if (star - 0.5 <= this.rating()) return 'fill-yellow-400/50 text-yellow-400';
    return 'fill-muted text-muted';
  }

  setRating(star: number): void {
    if (!this.readonly()) {
      this.onRatingChange.emit(star);
    }
  }

  getSizeClass(): string {
    return this.size() === 'sm' ? 'h-3 w-3' : this.size() === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  }
}
