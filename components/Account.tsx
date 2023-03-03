import { useState, useEffect, useCallback } from "react";
import { useUser, useSupabaseClient, Session } from "@supabase/auth-helpers-react";
import type { Database } from "@/types/supabase";
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Account({ session }: { session: Session }) {
    const supabase = useSupabaseClient<Database>();
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<Profiles['username']>(null);
    const [website, setWebsite] = useState<Profiles['website']>(null);
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

    const getProfile = useCallback(() => {
        return async () => {
            try {
                setLoading(true);
                if (!user) throw new Error('No user');

                let { data, error, status } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url`)
                    .eq('id', user.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setUsername(data.username);
                    setWebsite(data.website);
                    setAvatarUrl(data.avatar_url);
                }

            } catch (error) {
                alert('Error handling user data');
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, [supabase, user]);

    const updateProfile = useCallback(() => {
        return async ({
            username,
            website,
            avatar_url
        }: {
            username: Profiles['username']
            website: Profiles['website']
            avatar_url: Profiles['avatar_url']
        }) => {
            try {
                setLoading(true);
                if (!user) throw new Error('No user');

                const updates = {
                    id: user.id,
                    username,
                    website,
                    avatar_url,
                    updated_at: new Date().toISOString(),
                }

                let {error} = await supabase.from('profiles').upsert(updates);
                if(error) throw error;
                alert('Profile updated');
            } catch (error) {
                alert('Error has occured while updating profile');
            } finally {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

}