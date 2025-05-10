import { User } from "./user";

export type story = {
    // author: User;
    creator:number;
    creator_username:string;
    id: number;
    episodes_count:number;
    title: string;
    cover_image: string;
    description: string;
    follow?: boolean;
    is_liked: boolean;
    is_favorited: boolean;
    is_followed: boolean;
    status:string;
    likes_count: number;
    created_at:string;
    updated_at:string;
    episodes?:any;
    followed_by:number[];
    liked_by:number[];
}