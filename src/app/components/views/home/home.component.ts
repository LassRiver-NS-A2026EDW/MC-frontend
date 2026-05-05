import { Component, computed } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  constructor(public store: AppStore) {}

  stats = computed(() => this.store.stats());
  featuredBooks = computed(() => this.store.books().filter(b => b.rating >= 4.7).slice(0, 4));
  recentBooks = computed(() => this.store.books().slice(0, 4));
}
