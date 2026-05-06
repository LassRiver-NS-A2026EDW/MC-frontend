import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, LogIn, X } from 'lucide-angular';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './auth-modal.html',
})
export class AuthModalComponent {
  readonly isOpen = input<boolean>(false);
  readonly message = input<string>('Debes iniciar sesión para usar esta función.');
  readonly onClose = output<void>();

  readonly LogInIcon = LogIn;
  readonly XIcon = X;

  constructor(private router: Router) {}

  close() {
    this.onClose.emit();
  }

  goToLogin() {
    this.close();
    this.router.navigate(['/login']);
  }
}
