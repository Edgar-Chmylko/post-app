import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { isLoading, selectAllUserPosts } from '../../../state/user-posts/user-posts.selectors';
import { loadUserPosts } from '../../../state/user-posts/user-posts.actions';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-user-posts-list',
  imports: [CommonModule, CardComponent, SpinnerComponent],
  styleUrl: './user-posts-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(loading()) {
      <app-spinner state=component></app-spinner>
    }
    @else {
      <div class="user-posts-container">
        @for(userPost of userPosts(); track userPost.id) {
          <app-card [title]="userPost.title" [content]="userPost.body"></app-card>
        }
        @empty {
          No users posts found.
        }
      </div>
    } 
  `,
})
export class UserPostsListComponent {
  private store = inject(Store<AppState>)

  userId = input.required<number>();

  userPosts = toSignal(this.store.select(selectAllUserPosts));
  loading = toSignal(this.store.select(isLoading));

  loadUserPosts = effect(() => {
    const userId = this.userId();

    this.store.dispatch(loadUserPosts({ userId: userId }));
  })
}
