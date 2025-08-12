import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';

import { Links } from '@/configs/links';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = await createClient();
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ✅ すでにログイン済み（=セッションあり）ならそのままリダイレクト
  if (session?.user) {
    redirect(Links.home);
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirect('/auth/signin?complete=true');
    } else {
      console.error('error');
    }
  } else {
    console.error('error');
  }
}
