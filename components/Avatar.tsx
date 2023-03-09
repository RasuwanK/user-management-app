import type {Database} from "@/types/supabase";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Avatar({
    uid,
    url,
    size,
    onUpload
}: {
    uid: string;
    url: Profiles['avatar_url'];
    size: number;
    onUpload: (url: string) => void;
}) {
    const supabase = useSupabaseClient<Database>();
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null); 
    const [uploading, setUploading] = useState<boolean>(false);
    return (
        <></>
    )
}