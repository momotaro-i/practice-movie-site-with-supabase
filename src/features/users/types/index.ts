export type Profile = {
  avatar_url: string | null;
  full_name: string | null;
  id: string;
  updated_at: string;
  username: string | null;
  website: string | null;
};

export type UpdateProfileData = {
  avatar_url: string | null;
  fullname: string | null;
  username: string | null;
  website: string | null;
};
