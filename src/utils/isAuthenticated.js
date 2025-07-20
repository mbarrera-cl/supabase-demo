import { supabase } from '../supabaseClient';

export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};
