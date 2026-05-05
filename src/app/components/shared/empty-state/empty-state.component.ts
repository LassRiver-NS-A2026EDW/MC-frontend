import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyStateComponent {
  readonly icon = input<string>('📭');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');
  readonly onAction = output<void>();
}
