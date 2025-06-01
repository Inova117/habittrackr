import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL || 'https://mock-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || 'mock-anon-key';

// Mock Supabase client for demo purposes if real credentials aren't available
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
