'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

import { Links } from '@/configs/links';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: signInData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    return;
    // redirect(Links.error);
  }
  console.log(signInData);

  revalidatePath('/', 'layout');
  redirect(Links.home);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    return;
    // redirect(Links.error);
  }

  revalidatePath('/', 'layout');
  redirect(Links.auth.signin + '?send=true');
}
