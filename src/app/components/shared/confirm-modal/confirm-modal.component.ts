import { Component, input, output } from '@angular/core';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './confirm-modal.html',
})
export class ConfirmModalComponent {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('¿Estás seguro?');
  readonly description = input<string>('Esta acción no se puede deshacer.');
  readonly confirmText = input<string>('Confirmar');
  readonly cancelText = input<string>('Cancelar');
  readonly isDestructive = input<boolean>(false);
  
  readonly onConfirm = output<void>();
  readonly onClose = output<void>();

  readonly AlertIcon = AlertTriangle;
  readonly XIcon = X;

  close() {
    this.onClose.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}
