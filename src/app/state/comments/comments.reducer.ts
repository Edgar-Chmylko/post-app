import { createReducer, on } from "@ngrx/store";
import { CommentItem, PostItem } from "../../Posts/models/models";
import { loadComments, loadCommentsFailure, loadCommentsSuccess } from "./comments.actions";

export interface CommentsState {
    comments: CommentItem[];
    error: string | null;
    loading: boolean;
}

export const initialState: CommentsState = {
    comments: [],
    error: null,
    loading: false
}

export const commentsReducer = createReducer(
    initialState,
    on(loadComments, (state) => ({ ...state, loading: true })),
    on(loadCommentsSuccess, (state, { comments }) => ({
        ...state,
        comments: comments,
        error: null,
        loading: false
    })),
    on(loadCommentsFailure, (state, { error }) => ({ ...state, error: error, loading: false }))
)

