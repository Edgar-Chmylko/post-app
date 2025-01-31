import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { loadComments } from '../../../state/comments/comments.actions';
import { isLoading, selectAllComments } from '../../../state/comments/comments.selectors';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop'
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../../../shared/components/card/card.component';
import { hideEmailDomainPipe } from '../../../shared/pipes/email.guard';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-comments-list',
  imports: [
    CommonModule,
    MatCardModule,
    CardComponent,
    hideEmailDomainPipe,
    SpinnerComponent
  ],
  styleUrl: './comments-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(loading()) {
      <app-spinner state=component></app-spinner>
    }
    @else {
      <div class="comments-container">
      @for(comment of postComments(); track comment.id){
        <app-card
          [title]="comment.name"
          [subtitle]="comment.email | hideEmailDomain"
          [content]="comment.body"
        ></app-card>
      } @empty {
        <div>There are no comments.</div>
      }
    </div>
    }
  `,
})
export class CommentsListComponent {
  private store = inject(Store<AppState>)

  postId = input.required<number>();

  postComments = toSignal(this.store.select(selectAllComments));
  loading = toSignal(this.store.select(isLoading))

  loadComments = effect(() => {
    const postId = this.postId();

    this.store.dispatch(loadComments({ postId: this.postId() }));
  })
}
