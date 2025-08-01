import { useCallback, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

import { type Profile, type UpdateProfileData } from '../types';

export const useProfile = (userId: string | undefined) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const getProfile = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', userId)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setProfile({
          id: userId,
          full_name: data.full_name,
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(error);
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  const updateProfile = useCallback(
    async (updateData: UpdateProfileData) => {
      if (!userId) return;

      try {
        setLoading(true);

        const { error } = await supabase.from('profiles').upsert({
          id: userId,
          full_name: updateData.fullname,
          username: updateData.username,
          website: updateData.website,
          avatar_url: updateData.avatar_url,
          updated_at: new Date().toISOString(),
        });

        if (error) throw error;
        alert('Profile updated!');

        // プロフィールを再取得
        await getProfile();
      } catch (error) {
        console.error(error);
        alert('Error updating the data!');
      } finally {
        setLoading(false);
      }
    },
    [userId, supabase, getProfile]
  );

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return {
    profile,
    loading,
    updateProfile,
  };
};
