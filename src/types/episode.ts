export type Episode = {
    id: number;
    title:string;
    content: string;
    created_at: string;
    creator: number;
    creator_username: string;
    creator_admin: {
        id: number;
        username: string;
        role: string;
    } | null;
    story_id: number;
    story_title: string;
    version: number;
    parent_episode: number | null;
    previous_id: number | null;
    next_id: number | null;
    previous_version: {
        id: number;
        title: string;
        version: number;
        version_number: string;
    } | null;
    next_version: {
        id: number;
        title: string;
        version: number;
        version_number: string;
    } | null;
    other_version_id: number | null;
    is_liked: boolean;
    is_reported: boolean;
    likes_count: number;
    reporting_users: string[];
    reports_count: number;
    status: string; 
    has_previous: boolean;
    has_next: boolean;
    has_other_version: boolean;
};