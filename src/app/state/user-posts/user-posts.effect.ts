import { inject, Injectable } from "@angular/core";
import { PostsApiService } from "../../Posts/services/posts-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { loadUserPosts, loadUserPostsFailure, loadUserPostsSuccess } from "./user-posts.actions";

@Injectable()
export class UserPostsEffects {
    private actions$ = inject(Actions);
    private postsService = inject(PostsApiService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserPosts),
            switchMap((userId) =>
                this.postsService.loadUserPosts(userId.userId).pipe(
                    map((userPosts) => loadUserPostsSuccess({ userPosts: userPosts })),
                    catchError((error) => of(loadUserPostsFailure({ error })))
                )
            )
        )
    );
}