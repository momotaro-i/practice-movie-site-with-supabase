import { createClient } from '@/utils/supabase/client';

export function getPublicThumbUrl(path: string) {
  const supabase = createClient();
  const url = supabase.storage.from('thumbnails').getPublicUrl(path).data.publicUrl;
  return url;
}
