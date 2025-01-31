import { createAction, props } from "@ngrx/store";
import { PostItem } from "../../Posts/models/models";

export const loadUserPosts = createAction(
    '[User Posts Page] Load User Posts',
    props<{ userId: number }>()
);

export const loadUserPostsSuccess = createAction(
    '[User Posts API] User Posts Load Success',
    props<{ userPosts: PostItem[] }>()
);

export const loadUserPostsFailure = createAction(
    '[User Posts API] User Posts Load Failure',
    props<{ error: string }>()
);