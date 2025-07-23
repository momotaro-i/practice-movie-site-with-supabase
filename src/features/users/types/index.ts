export type Profile = {
  id: string;
  full_name: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
  updated_at: string;
};

export type UpdateProfileData = {
  username: string | null;
  fullname: string | null;
  website: string | null;
  avatar_url: string | null;
};
