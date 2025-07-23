'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { LoginFormData, SignupFormData } from './types';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  // 入力値の検証
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    redirect('/error?message=invalid-input');
  }

  const data: LoginFormData = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  // 入力値の検証
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    // FIXME: エラーを返す
    return;
  }

  const data: SignupFormData = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}
