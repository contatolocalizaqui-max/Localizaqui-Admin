import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Key from environment variables
// No Vite, import.meta.env é usado em tempo de build
// Também tenta process.env como fallback (para compatibilidade)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || 
                    '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || 
                       '';

// Debug: Log para verificar se as variáveis estão sendo carregadas
// Sempre logar em produção também para debug
console.log('🔍 Debug Supabase Config:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlLength: supabaseUrl?.length || 0,
  keyLength: supabaseAnonKey?.length || 0,
  urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  keyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 30)}...` : 'missing',
  mode: import.meta.env.MODE,
  allEnvKeys: Object.keys(import.meta.env).filter(k => k.includes('SUPABASE') || k.includes('VITE')),
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase não configurado!', {
    missingUrl: !supabaseUrl,
    missingKey: !supabaseAnonKey,
    envKeys: Object.keys(import.meta.env).filter(k => k.includes('SUPABASE')),
    allViteKeys: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')),
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


