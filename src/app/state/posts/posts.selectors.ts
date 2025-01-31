import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state"
import { PostsState } from "./posts.reducer";

export const selectPosts = (state: AppState) => state.posts;

export const selectAllPosts = createSelector(
    selectPosts,
    (state: PostsState) => state.posts
);

export const selectPostById = (id: number) => createSelector(
    selectPosts,
    (state: PostsState) => state.posts.find((post) => post.id == id)
)

export const isLoading = createSelector(
    selectPosts,
    (state: PostsState) => state.loading
)
