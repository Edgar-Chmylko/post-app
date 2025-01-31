import { inject, Injectable } from "@angular/core";
import { PostsApiService } from "../../Posts/services/posts-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadPosts, loadPostsFailure, loadPostsSuccess } from "./posts.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class PostsEffects {
    private actions$ = inject(Actions);
    private postsService = inject(PostsApiService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPosts),
            switchMap(() =>
                this.postsService.loadPosts().pipe(
                    map((posts) => loadPostsSuccess({ posts: posts })),
                    catchError((error) => of(loadPostsFailure({ error })))
                )
            )
        )
    );
}