export type Businesses = {
  id: number;
  name: string;
  api_key: string;
  domain?: string | null;
  logo_path?: string | null;
  preferred_timezone?: string | null;
  currency?: string | null;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
};