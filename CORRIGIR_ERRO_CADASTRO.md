# 🔧 Corrigir Erro "Failed to fetch" no Cadastro

## 🔴 Problema Identificado

O erro "Failed to fetch" no cadastro indica que a requisição ao Supabase está falhando. Isso geralmente acontece por:

1. **Variáveis de ambiente não configuradas no Vercel**
2. **URL do Supabase incorreta ou bloqueada**
3. **Problemas de CORS**
4. **Supabase client usando valores placeholder**

## ✅ Correções Aplicadas

1. ✅ Adicionada validação para verificar se Supabase está configurado antes de usar
2. ✅ Melhoradas mensagens de erro para serem mais específicas e amigáveis
3. ✅ Adicionado tratamento de erros de rede e CORS

## 📋 Verificar Variáveis de Ambiente no Vercel

### 1. Acessar Configurações do Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Ou: Vercel Dashboard > Seu Projeto > Settings > Environment Variables

### 2. Verificar Variáveis Obrigatórias

Certifique-se de que estas variáveis estão configuradas para **Production, Preview e Development**:

#### Frontend (com `VITE_`):
- ✅ `VITE_SUPABASE_URL`
  - Valor: `https://rwlzlkgcgvpahyhvczbc.supabase.co`
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- ✅ `VITE_SUPABASE_ANON_KEY`
  - Valor: (sua chave anon do Supabase)
  - Começa com: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Environments: ✅ Production, ✅ Preview, ✅ Development

#### Backend (sem `VITE_`):
- ✅ `SUPABASE_URL`
  - Valor: `https://rwlzlkgcgvpahyhvczbc.supabase.co`
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- ✅ `SUPABASE_SERVICE_ROLE_KEY`
  - Valor: (sua chave service role do Supabase)
  - Environments: ✅ Production, ✅ Preview, ✅ Development

### 3. Como Obter as Chaves do Supabase

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/settings/api
2. **URL do Projeto**: Copie a "Project URL"
3. **Anon Key**: Copie a "anon public" key (para frontend)
4. **Service Role Key**: Copie a "service_role" key (para backend - **MANTENHA SECRETA**)

## 🔍 Verificar se Está Funcionando

### 1. Verificar Console do Navegador

1. Abra a página de cadastro
2. Pressione F12 (DevTools)
3. Vá na aba "Console"
4. Procure por:
   - ✅ "Supabase URL e/ou Anon Key não estão configuradas" (indica problema)
   - ✅ Erros de rede (Failed to fetch, CORS, etc.)

### 2. Verificar Network Tab

1. F12 > Network
2. Tente fazer cadastro
3. Procure por requisições para:
   - `supabase.co/auth/v1/signup`
   - Status deve ser `200` ou `201` (não `404` ou `500`)

### 3. Verificar Logs do Vercel

1. Acesse: https://vercel.com/seu-projeto/deployments
2. Clique no último deploy
3. Veja os logs do build
4. Procure por erros relacionados a variáveis de ambiente

## 🚀 Após Configurar Variáveis

1. **Fazer novo deploy**:
   ```bash
   vercel --prod
   ```

2. **Ou aguardar deploy automático** (se configurado com GitHub)

3. **Testar novamente** o cadastro

## 🆘 Se Ainda Não Funcionar

### Verificar Configuração do Supabase

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/settings/auth
2. Verifique:
   - ✅ **Site URL**: Deve ser `https://localizaqui.com` ou sua URL do Vercel
   - ✅ **Redirect URLs**: Deve incluir:
     - `https://localizaqui.com/**`
     - `https://seu-projeto.vercel.app/**`
     - `http://localhost:3000/**` (para desenvolvimento)

### Verificar CORS

Se ainda houver erro de CORS:

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/settings/api
2. Verifique se a URL do seu site está nas configurações permitidas

### Testar Localmente

1. Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   VITE_SUPABASE_URL=https://rwlzlkgcgvpahyhvczbc.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```

2. Execute:
   ```bash
   npm run dev
   ```

3. Teste o cadastro localmente

4. Se funcionar localmente mas não no Vercel, o problema é nas variáveis de ambiente do Vercel

## 📝 Checklist Final

- [ ] Variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` configuradas no Vercel
- [ ] Variáveis configuradas para Production, Preview e Development
- [ ] Site URL e Redirect URLs configurados no Supabase
- [ ] Novo deploy realizado após configurar variáveis
- [ ] Testado no navegador (F12 > Console para ver erros)
- [ ] Network tab mostra requisições bem-sucedidas ao Supabase

