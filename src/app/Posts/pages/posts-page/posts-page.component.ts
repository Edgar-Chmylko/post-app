import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { PostsListComponent } from '../../components/posts-list/posts-list.component';
import { loadPosts } from '../../../state/posts/posts.actions';
import { Store } from '@ngrx/store';
import { isLoading, selectAllPosts, selectPostById } from '../../../state/posts/posts.selectors';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../state/app.state';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { PostItem } from '../../models/models';
import { MatDividerModule } from '@angular/material/divider';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-posts-page',
  imports: [
    CommonModule,
    PostsListComponent,
    PostItemComponent,
    MatDividerModule,
    SpinnerComponent
  ],
  styleUrl: './posts-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if(loading()) {
   <app-spinner></app-spinner>
  }
  @else {
    <div class="posts-page">
      <div class="posts-container">
        <div class="side-panel">
          <app-posts-list 
            [posts]="allPosts()!"
            (onSelectedPostId)="onSelectedPost($event)"
          ></app-posts-list>
      </div>
        
      <mat-divider vertical></mat-divider>
        
      <div class="side-panel">
        <app-post-item 
          [post]="selectedPost()"
        ></app-post-item>
      </div>
    </div>
  </div>
  }
  `,
})
export class PostsPageComponent implements OnInit {
  private store = inject(Store<AppState>);

  selectedPost = signal<PostItem | undefined>(undefined);

  allPosts = toSignal(this.store.select(selectAllPosts));
  loading = toSignal(this.store.select(isLoading));

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  onSelectedPost(postId: number) {
    this.store.select(selectPostById(postId)).subscribe(post => this.selectedPost.set(post))
  }
}
