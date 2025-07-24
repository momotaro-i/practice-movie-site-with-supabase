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
    // redirect('/error?message=invalid-input');
    console.error('Signin input error');
    return;
  }

  const data: LoginFormData = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Signin error:', error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  console.log(formData);

  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  // 入力値の検証
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    console.error('Signup error');
    return;
  }

  const data: SignupFormData = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('Signin error:', error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/signin');
}
