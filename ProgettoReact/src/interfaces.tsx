export interface PostProp{
    titolo: string;
    contenuto: string;
    data: Date;
    autore: string;
}

export interface CreatePostCallback {
    (post: PostProp): void;
}

export interface CreatePostComponentProps {
    callback: CreatePostCallback;
}