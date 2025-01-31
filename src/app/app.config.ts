import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { postsReducer } from './state/posts/posts.reducer';
import { PostsEffects } from './state/posts/posts.effects';
import { provideHttpClient } from '@angular/common/http';
import { CommentsEffects } from './state/comments/comments.effects';
import { commentsReducer } from './state/comments/comments.reducer';
import { UserPostsEffects } from './state/user-posts/user-posts.effect';
import { userPostsReducer } from './state/user-posts/user-posts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ posts: postsReducer, comments: commentsReducer, userPosts: userPostsReducer }),
    provideEffects(PostsEffects, CommentsEffects, UserPostsEffects),
    provideAnimations()]
};
