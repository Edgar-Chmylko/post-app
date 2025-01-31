import { createAction, props } from "@ngrx/store";
import { CommentItem } from "../../Posts/models/models";

export const loadComments = createAction(
    '[Comments Page] Load Comments',
    props<{ postId: number }>()
);

export const loadCommentsSuccess = createAction(
    '[Comments Page] Comments Load Success',
    props<{ comments: CommentItem[] }>()
);

export const loadCommentsFailure = createAction(
    '[Comments API] Comments Load Failure',
    props<{ error: string }>()
);