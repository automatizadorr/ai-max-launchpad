// External Supabase project (migrated from Lovable Cloud)
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vtkrpitsgwznmkqnanmq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0a3JwaXRzZ3d6bm1rcW5hbm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjQwNTEsImV4cCI6MjA5Mzc0MDA1MX0.FncoGqCgIK013ubKkY0Yp3RXuon8MXL74EUJmOlbClA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
