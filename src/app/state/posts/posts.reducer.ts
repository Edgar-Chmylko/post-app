import { createReducer, on } from "@ngrx/store";
import { PostItem } from "../../Posts/models/models";
import { loadPosts, loadPostsFailure, loadPostsSuccess } from "./posts.actions";

export interface PostsState {
    posts: PostItem[];
    error: string | null;
    loading: boolean;
}

export const initialState: PostsState = {
    posts: [],
    error: null,
    loading: false
}

export const postsReducer = createReducer(
    initialState,
    on(loadPosts, (state) => ({ ...state, loading: true })),
    on(loadPostsSuccess, (state, { posts }) => ({
        ...state,
        posts: posts,
        error: null,
        loading: false
    })),
    on(loadPostsFailure, (state, { error }) => ({ ...state, error: error, loading: false }))
)

