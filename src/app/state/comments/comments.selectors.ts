import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state"
import { CommentsState } from "./comments.reducer";

export const selectComments = (state: AppState) => state.comments;

export const selectAllComments = createSelector(
    selectComments,
    (state: CommentsState) => state.comments
);

export const isLoading = createSelector(
    selectComments,
    (state: CommentsState) => state.loading
)
