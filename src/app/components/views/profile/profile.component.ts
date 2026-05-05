import { Component, signal } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  editing = signal(false);
  editName = signal('');
  editEmail = signal('');

  constructor(public store: AppStore) {}

  get user() { return this.store.currentUser(); }

  startEditing(): void {
    if (this.user) {
      this.editName.set(this.user.name);
      this.editEmail.set(this.user.email);
      this.editing.set(true);
    }
  }

  saveProfile(): void {
    this.store.updateProfile({ name: this.editName(), email: this.editEmail() });
    this.editing.set(false);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }
}
