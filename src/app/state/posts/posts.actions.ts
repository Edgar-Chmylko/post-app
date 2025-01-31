import { createAction, props } from "@ngrx/store";
import { PostItem } from "../../Posts/models/models";

export const loadPosts = createAction('[Posts Page] Load Posts');

export const loadPostsSuccess = createAction(
    '[Posts API] Posts Load Success',
    props<{ posts: PostItem[] }>()
);

export const loadPostsFailure = createAction(
    '[Posts API] Posts Load Failure',
    props<{ error: string }>()
);