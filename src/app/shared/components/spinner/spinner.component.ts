import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div [ngClass]="state() === 'component'? 'component': 'backdrop global'">
    <mat-spinner></mat-spinner>
  </div>`,

})
export class SpinnerComponent {
  state = input<'global' | 'component'>('global');
}
