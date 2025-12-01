# 🚨 SOLUÇÃO IMEDIATA - Configurar Variáveis no Vercel

## ❌ Problema Confirmado

O console mostra:
```
❌ Supabase não configurado!
{missingUrl: true, missingKey: true, envkeys: Array(0)}
POST https://placeholder.supabase.co/auth/v1/signup net::ERR_NAME_NOT_RESOLVED
```

**As variáveis de ambiente NÃO estão configuradas no Vercel.**

## ✅ SOLUÇÃO EM 3 PASSOS

### PASSO 1: Obter Chaves do Supabase (2 minutos)

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/settings/api
2. Você verá duas informações importantes:
   - **Project URL**: `https://rwlzlkgcgvpahyhvczbc.supabase.co`
   - **anon public** key: (uma string longa que começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

3. **Copie ambas** - você vai precisar delas no próximo passo

### PASSO 2: Adicionar Variáveis no Vercel (3 minutos)

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
   - Substitua `seu-projeto` pelo nome do seu projeto no Vercel

2. Clique no botão **"Add New"** (Adicionar Nova)

3. **Primeira Variável:**
   - **Key (Nome):** `VITE_SUPABASE_URL`
   - **Value (Valor):** `https://rwlzlkgcgvpahyhvczbc.supabase.co`
   - **Environments (Ambientes):** 
     - ✅ Marque **Production**
     - ✅ Marque **Preview**
     - ✅ Marque **Development**
   - Clique em **"Save"**

4. Clique em **"Add New"** novamente

5. **Segunda Variável:**
   - **Key (Nome):** `VITE_SUPABASE_ANON_KEY`
   - **Value (Valor):** (cole a chave anon que você copiou do Supabase)
   - **Environments (Ambientes):**
     - ✅ Marque **Production**
     - ✅ Marque **Preview**
     - ✅ Marque **Development**
   - Clique em **"Save"**

### PASSO 3: Fazer Novo Deploy (1 minuto)

**⚠️ CRÍTICO:** As variáveis só funcionam em **NOVOS DEPLOYS**. Você DEVE fazer um novo deploy agora.

Execute no terminal:
```bash
vercel --prod
```

Aguarde o deploy completar (cerca de 30-60 segundos).

## ✅ Como Verificar se Funcionou

### 1. Verificar no Console

1. Abra: `localizaqui.com`
2. Pressione **F12** (DevTools)
3. Vá na aba **"Console"**
4. **NÃO deve aparecer:**
   - ❌ `Supabase não configurado!`
   - ❌ `missingUrl: true`
   - ❌ `placeholder.supabase.co`

### 2. Tentar Cadastro

1. Preencha o formulário
2. Clique em "Criar Conta"
3. **Deve funcionar agora!**

## 📋 Checklist Rápido

- [ ] Acessei Supabase e copiei a URL e a chave anon
- [ ] Acessei Vercel > Settings > Environment Variables
- [ ] Adicionei `VITE_SUPABASE_URL` com a URL correta
- [ ] Marquei Production, Preview e Development
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY` com a chave correta
- [ ] Marquei Production, Preview e Development
- [ ] Executei `vercel --prod`
- [ ] Aguardei o deploy completar
- [ ] Testei no navegador (F12 > Console)
- [ ] Tentei fazer um cadastro

## 🆘 Se Ainda Não Funcionar

### Verificar se as Variáveis Foram Salvas

1. Volte em: https://vercel.com/seu-projeto/settings/environment-variables
2. Você deve ver na lista:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Clique em cada uma e verifique:
   - O valor está correto?
   - Está marcado para Production?

### Verificar se o Deploy Foi Feito

1. Acesse: https://vercel.com/seu-projeto/deployments
2. O deploy mais recente deve ser de **agora** (após você adicionar as variáveis)
3. Se não houver deploy recente, execute `vercel --prod` novamente

### Verificar Nome das Variáveis

- ✅ **Correto:** `VITE_SUPABASE_URL` (com `VITE_` no início)
- ❌ **Errado:** `SUPABASE_URL` (sem `VITE_`)

**No Vite, variáveis do frontend DEVEM começar com `VITE_`**

## 🔗 Links Diretos

- **Vercel Environment Variables:** https://vercel.com/dashboard
- **Supabase API Settings:** https://supabase.com/dashboard/project/_/settings/api

## ⚡ Comando para Deploy

```bash
vercel --prod
```

**Execute este comando DEPOIS de adicionar as variáveis no Vercel!**

