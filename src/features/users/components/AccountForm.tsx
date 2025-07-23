'use client';

import { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';

type Props = {
  user: {
    id: string;
    email: string | null;
  } | null;
};

export default function AccountForm({ user }: Props) {
  const { profile, loading, updateProfile } = useProfile(user?.id);

  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  // プロフィールが更新されたら状態を更新
  useEffect(() => {
    if (profile) {
      setFullname(profile.full_name);
      setUsername(profile.username);
      setWebsite(profile.website);
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleUpdateProfile = () => {
    updateProfile({
      fullname,
      username,
      website,
      avatar_url,
    });
  };

  return (
    <div className='form-widget'>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={user?.email || ''} disabled />
      </div>

      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input id='fullName' type='text' value={fullname || ''} onChange={(e) => setFullname(e.target.value)} />
      </div>

      <div>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' value={username || ''} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <label htmlFor='website'>Website</label>
        <input id='website' type='url' value={website || ''} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div>
        <button className='button primary block' onClick={handleUpdateProfile} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action='/auth/signout' method='post'>
          <button className='button block' type='submit'>
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
