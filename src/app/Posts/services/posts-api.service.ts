import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentItem, PostItem } from '../models/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  loadPosts() {
    const httpParams = { _start: 0, _limit: 50 };
    const headers = new HttpHeaders({
      'Client': 'loadPostHeader'
    });

    return this.httpClient.get<PostItem[]>(this.baseUrl + '/posts', { params: httpParams, headers: headers });
  }

  loadUserPosts(userId: number) {
    const httpParams = { userId: userId }
    const headers = new HttpHeaders({
      'Client': 'loadUserPostHeader'
    });

    return this.httpClient.get<PostItem[]>(`${this.baseUrl}/posts`, { params: httpParams, headers: headers })
  }

  loadPostComments(postId: number) {
    const headers = new HttpHeaders({
      'Client': 'loadPostComments'
    });

    return this.httpClient.get<CommentItem[]>(`${this.baseUrl}/posts/${postId}/comments`, { headers: headers })
  }

}
