import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.html',
  styleUrl: './loading-skeleton.css',
})
export class LoadingSkeletonComponent {
  readonly count = input<number>(8);
  readonly type = input<'card' | 'detail' | 'table'>('card');
}
