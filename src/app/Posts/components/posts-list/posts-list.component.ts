import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PostItem } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-list',
  imports: [CommonModule, MatTableModule],
  styleUrl: './posts-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="table-container">
    <mat-table [dataSource]="posts()">
      <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let post"> {{post.id}} </td>
      </ng-container>
      <ng-container matColumnDef="userId">
          <th mat-header-cell *matHeaderCellDef> User ID </th>
          <td mat-cell *matCellDef="let post"> {{post.userId}} </td>
      </ng-container>
      <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef> Title </th>
          <td mat-cell *matCellDef="let post"> {{post.title}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr 
        mat-row 
        *matRowDef="let post; 
        columns: displayedColumns;" 
        (click)="getPost(post)" 
        [ngClass]="post.id === selectedPostId() ? 'posts-table-row__active' : 'posts-table-row'"
      ></tr>
    </mat-table>
  </div> 
  `
})
export class PostsListComponent {
  posts = input.required<PostItem[]>();
  selectedPostId = signal<number | null>(null);
  onSelectedPostId = output<number>();

  displayedColumns = ['position', 'userId', 'title'];

  getPost(post: PostItem) {
    this.selectedPostId.set(post.id);
    this.onSelectedPostId.emit(post.id);
  }
}
