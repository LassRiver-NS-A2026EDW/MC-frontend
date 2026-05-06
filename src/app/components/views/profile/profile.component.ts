import { Component, computed, inject, signal, effect } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, User, Mail, Shield, LogIn, Heart, MessageSquare } from 'lucide-angular';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { RoleBadgeComponent } from '../../shared/role-badge/role-badge.component';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars.component';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, LucideAngularModule, EmptyStateComponent, RoleBadgeComponent, RatingStarsComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  readonly store = inject(AppStore);
  readonly router = inject(Router);

  editName = signal(this.store.currentUser()?.name || '');
  editEmail = signal(this.store.currentUser()?.email || '');

  constructor() {
    effect(() => {
      const user = this.store.currentUser();
      if (user) {
        this.editName.set(user.name);
        this.editEmail.set(user.email);
      }
    }, { allowSignalWrites: true });
  }

  readonly UserIcon = User;
  readonly MailIcon = Mail;
  readonly ShieldIcon = Shield;
  readonly LogInIcon = LogIn;
  readonly HeartIcon = Heart;
  readonly MessageSquareIcon = MessageSquare;

  get currentUser() { return this.store.currentUser(); }
  get favorites() { return this.store.favorites(); }
  
  readonly userReviews = computed(() => {
    return this.store.reviews().filter(r => r.userId === this.store.currentUser()?.id);
  });

  saveProfile(): void {
    if (!this.editName().trim() || !this.editEmail().trim()) {
      return;
    }
    this.store.updateProfile({ name: this.editName(), email: this.editEmail() });
  }
}
