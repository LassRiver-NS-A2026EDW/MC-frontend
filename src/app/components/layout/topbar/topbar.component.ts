import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { LucideAngularModule, Search, Bell, Sun, Moon, LogOut } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent {
  readonly router = inject(Router);

  constructor(public store: AppStore) {}

  readonly SearchIcon = Search;
  readonly BellIcon = Bell;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly LogOutIcon = LogOut;

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setSearchQuery(target.value);
  }
}
