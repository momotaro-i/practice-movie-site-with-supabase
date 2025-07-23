import AccountForm from '@/features/users/components/AccountForm';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user ? { id: user.id, email: user.email ?? null } : null} />;
}
