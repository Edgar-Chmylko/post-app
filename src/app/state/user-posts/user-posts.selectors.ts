import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state"
import { UserPostsState } from "./user-posts.reducer";

export const selectUserPosts = (state: AppState) => state.userPosts;

export const selectAllUserPosts = createSelector(
    selectUserPosts,
    (state: UserPostsState) => state.userPosts
);

export const isLoading = createSelector(
    selectUserPosts,
    (state: UserPostsState) => state.loading
)
