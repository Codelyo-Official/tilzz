import { Episode } from "./episode";

export type Version = {
    id: number;
    version_number: string;
    created_at: string;
    story: number;
    previous_id: number | null;
    next_id: number | null;
    has_previous: boolean;
    has_next: boolean;
    episodes: Episode[];
  };
  