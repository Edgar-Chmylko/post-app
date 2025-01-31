import { CommentsState } from "./comments/comments.reducer";
import { PostsState } from "./posts/posts.reducer";
import { UserPostsState } from "./user-posts/user-posts.reducer";

export interface AppState {
    posts: PostsState;
    comments: CommentsState
    userPosts: UserPostsState
}