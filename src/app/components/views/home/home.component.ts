import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { LucideAngularModule, BookOpen, TrendingUp, Users, Star } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly store = inject(AppStore);
  readonly router = inject(Router);

  readonly BookOpenIcon = BookOpen;
  readonly TrendingUpIcon = TrendingUp;
  readonly UsersIcon = Users;
  readonly StarIcon = Star;

  stats = computed(() => this.store.stats());
  
  readonly featuredBooks = computed(() => {
    return this.store.books()
      .filter((b) => b.rating >= 4.7)
      .slice(0, 6);
  });

  readonly categories = computed(() => {
    return Array.from(new Set(this.store.books().map((b) => b.category)));
  });
}
