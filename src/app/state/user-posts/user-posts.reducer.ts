import { createReducer, on } from "@ngrx/store";
import { PostItem } from "../../Posts/models/models";
import { loadUserPosts, loadUserPostsFailure, loadUserPostsSuccess } from "./user-posts.actions";

export interface UserPostsState {
    userPosts: PostItem[];
    error: string | null;
    loading: boolean;
}

export const initialState: UserPostsState = {
    userPosts: [],
    error: null,
    loading: false
}

export const userPostsReducer = createReducer(
    initialState,
    on(loadUserPosts, (state) => ({ ...state, loading: true })),
    on(loadUserPostsSuccess, (state, { userPosts }) => ({
        ...state,
        userPosts: userPosts,
        error: null,
        loading: false
    })),
    on(loadUserPostsFailure, (state, { error }) => ({ ...state, error: error, loading: false }))
)

