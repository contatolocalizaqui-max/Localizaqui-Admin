# 🔍 Verificar Variáveis de Ambiente no Vercel

## ❌ Problema: "Serviço temporariamente indisponível"

Este erro indica que as variáveis de ambiente do Supabase **não estão configuradas** no Vercel.

## ✅ Solução: Configurar Variáveis no Vercel

### Passo 1: Acessar Configurações do Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Ou: Vercel Dashboard > Seu Projeto > Settings > Environment Variables

### Passo 2: Adicionar Variáveis Obrigatórias

**⚠️ IMPORTANTE: Configure para TODOS os ambientes (Production, Preview, Development)**

#### Variável 1: `VITE_SUPABASE_URL`
- **Key:** `VITE_SUPABASE_URL`
- **Value:** `https://rwlzlkgcgvpahyhvczbc.supabase.co`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### Variável 2: `VITE_SUPABASE_ANON_KEY`
- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Value:** (sua chave anon do Supabase)
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### Passo 3: Como Obter as Chaves do Supabase

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/settings/api
2. **Project URL**: Copie e use como `VITE_SUPABASE_URL`
3. **anon public key**: Copie e use como `VITE_SUPABASE_ANON_KEY`
   - Esta chave começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Passo 4: Fazer Novo Deploy

Após adicionar as variáveis:

1. **Opção 1: Deploy Automático**
   - Faça um commit e push (o Vercel detecta automaticamente)
   - Ou aguarde alguns minutos para o Vercel recarregar

2. **Opção 2: Redeploy Manual**
   ```bash
   vercel --prod
   ```

## 🔍 Como Verificar se Está Funcionando

### 1. Verificar no Console do Navegador

1. Abra a página de cadastro
2. Pressione F12 (DevTools)
3. Vá na aba "Console"
4. Procure por:
   - ✅ `🔍 Debug Supabase Config:` (em desenvolvimento)
   - ❌ `❌ Supabase não configurado!` (indica problema)

### 2. Verificar Network Tab

1. F12 > Network
2. Tente fazer cadastro
3. Procure por requisições para:
   - `supabase.co/auth/v1/signup`
   - Status deve ser `200` ou `201` (não `401` ou `500`)

### 3. Verificar Variáveis no Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Verifique se as variáveis aparecem na lista
3. Verifique se estão marcadas para Production

## 🆘 Se Ainda Não Funcionar

### Verificar se as Variáveis Estão Sendo Carregadas

1. Adicione um console.log temporário no código:
   ```typescript
   console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
   console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Presente' : 'Ausente');
   ```

2. Faça deploy e verifique o console do navegador

### Verificar Nome das Variáveis

- ✅ **Correto:** `VITE_SUPABASE_URL` (com `VITE_`)
- ❌ **Incorreto:** `SUPABASE_URL` (sem `VITE_`)

No Vite, variáveis do frontend **devem** começar com `VITE_`

### Verificar Ambiente

Certifique-se de que as variáveis estão configuradas para:
- ✅ **Production** (obrigatório)
- ✅ **Preview** (recomendado)
- ✅ **Development** (opcional, para testes locais)

## 📋 Checklist Final

- [ ] Variável `VITE_SUPABASE_URL` configurada no Vercel
- [ ] Variável `VITE_SUPABASE_ANON_KEY` configurada no Vercel
- [ ] Ambas marcadas para Production
- [ ] Novo deploy realizado após configurar
- [ ] Testado no navegador (F12 > Console para ver erros)
- [ ] Network tab mostra requisições bem-sucedidas ao Supabase

## 🔗 Links Úteis

- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Supabase API Settings:** https://supabase.com/dashboard/project/_/settings/api
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html

