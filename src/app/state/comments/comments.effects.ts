import { inject, Injectable } from "@angular/core";
import { PostsApiService } from "../../Posts/services/posts-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadComments, loadCommentsFailure, loadCommentsSuccess } from "./comments.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class CommentsEffects {
    private actions$ = inject(Actions);
    private postsService = inject(PostsApiService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadComments),
            switchMap((postId) =>
                this.postsService.loadPostComments(postId.postId).pipe(
                    map((comments) => loadCommentsSuccess({ comments: comments })),
                    catchError((error) => of(loadCommentsFailure({ error })))
                )
            )
        )
    );
}