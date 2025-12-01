import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Key from environment variables
// No Vite, import.meta.env é usado em tempo de build
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Debug: Log para verificar se as variáveis estão sendo carregadas (apenas em dev)
if (import.meta.env.DEV) {
  console.log('🔍 Debug Supabase Config:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlLength: supabaseUrl?.length || 0,
    keyLength: supabaseAnonKey?.length || 0,
    urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'missing',
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase não configurado!', {
    missingUrl: !supabaseUrl,
    missingKey: !supabaseAnonKey,
    envKeys: Object.keys(import.meta.env).filter(k => k.includes('SUPABASE')),
  });
}

// Create Supabase client - sempre criar, mesmo com valores vazios
// O Supabase client vai falhar na primeira chamada se não estiver configurado
// Mas isso permite que vejamos o erro real
const supabaseInstance = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export const supabase = supabaseInstance;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  const hasUrl = !!supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co';
  const hasKey = !!supabaseAnonKey && supabaseAnonKey !== 'placeholder-key';
  return hasUrl && hasKey;
};


