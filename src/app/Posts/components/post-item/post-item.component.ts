import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { PostItem } from '../../models/models';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { UserPostsListComponent } from '../user-posts-list/user-posts-list.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-item',
  imports: [
    MatButtonToggleModule,
    CommentsListComponent,
    UserPostsListComponent,
    CardComponent,
    MatProgressSpinnerModule
  ],
  styleUrl: './post-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(post()) {
      <div class="post-item-container">
   
      <div>
        <mat-button-toggle-group 
          hideSingleSelectionIndicator 
          [value]="selectedRadioButton()"
          (change)="onRadioValueChange($event)" 
          >
          <mat-button-toggle value="body">Body</mat-button-toggle>
          <mat-button-toggle value="comments">Comments</mat-button-toggle>
          <mat-button-toggle value="otherPosts">Other posts</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div>
          @switch (selectedRadioButton()) {
            @case('body') {
              <app-card [title]="post()!.title" [content]="post()!.body"></app-card>
            }
            @case('comments') {
              <app-comments-list [postId]="post()!.id"></app-comments-list>
            }
            @case('otherPosts') {
              <app-user-posts-list [userId]="post()!.userId"></app-user-posts-list>
            }        
        }
      </div>
  </div>
  }
  @else {
    <div class="post-item-info">
      Please select a post to view more information.
    </div>
  }   
  `,
})
export class PostItemComponent {
  post = input<PostItem | undefined>(undefined);

  selectedRadioButton = signal('body');

  onRadioValueChange(event: MatButtonToggleChange) {
    this.selectedRadioButton.set(event.value);
  }
}
