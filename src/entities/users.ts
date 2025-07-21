export type Users = {
  id: string;
  name: string;
  username: string;
  email: string;
  image_path?: string | null;
  business_id?: number | null;
  role_id: number;
  is_active: boolean;
  is_logged: boolean;
  last_logged_at?: string | null;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
};