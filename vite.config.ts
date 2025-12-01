import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Carregar variáveis de ambiente
    // No Vercel, as variáveis estão disponíveis em process.env durante o build
    const env = loadEnv(mode, process.cwd(), '');
    
    // Debug: Log das variáveis disponíveis (apenas em build)
    if (process.env.VERCEL) {
      console.log('🔍 Vite Build - Variáveis disponíveis:', {
        hasViteSupabaseUrl: !!env.VITE_SUPABASE_URL,
        hasViteSupabaseKey: !!env.VITE_SUPABASE_ANON_KEY,
        allViteKeys: Object.keys(env).filter(k => k.startsWith('VITE_')),
      });
    }
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Variáveis do Gemini
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // Variáveis do Supabase - usar env ou process.env como fallback
        'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''),
        'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''),
        'process.env.VITE_SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ''),
        // Expor via import.meta.env também
        'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''),
        'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
