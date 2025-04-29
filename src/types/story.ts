import { User } from "./user";

export type story = {
    author: User;
    id: number;
    episodes_count:number;
    title: string;
    cover_image: string;
    description: string;
    follow?: boolean;
    is_liked: boolean;
    is_favorited: boolean;
    status:string;
    likes_count: number;
    created_at:string;
    updated_at:string;
    episodes?:any;
}