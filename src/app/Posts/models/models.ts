export interface PostItem {
    id: number,
    userId: number,
    title: string,
    body: string
}

export interface CommentItem {
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string,
}
