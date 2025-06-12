export type story = {
    creator: number;
    creator_username: string;
    creator_admin: {
        id: number;
        username: string;
        role: string;
    } | null;
    id: number;
    title: string;
    cover_image: string;
    description: string;
    likes_count: number;
    created_at: string;
    updated_at: string;
    followed_by: number[];
    liked_by: number[];
    versions: any;
    visibility: string;
    organization: null | number;
}