# 🚨 URGENTE: Configurar Variáveis do Supabase no Vercel

## ❌ Erro Atual

O console mostra:
```
Supabase não configurado!
{missingUrl: true, missingKey: true, envkeys: Array(0)}
POST https://placeholder.supabase.co/auth/v1/signup net::ERR_NAME_NOT_RESOLVED
```

Isso confirma que as variáveis **NÃO estão configuradas** no Vercel.

## ✅ Solução Rápida (5 minutos)

### Passo 1: Obter Chaves do Supabase

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/settings/api
2. Copie estas informações:
   - **Project URL**: `https://rwlzlkgcgvpahyhvczbc.supabase.co`
   - **anon public key**: (começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Passo 2: Configurar no Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Clique em **"Add New"**

#### Adicionar Primeira Variável:
- **Key:** `VITE_SUPABASE_URL`
- **Value:** `https://rwlzlkgcgvpahyhvczbc.supabase.co`
- **Environments:** 
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
- Clique em **"Save"**

#### Adicionar Segunda Variável:
- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Value:** (cole a chave anon que você copiou)
- **Environments:**
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- Clique em **"Save"**

### Passo 3: Fazer Novo Deploy

Após adicionar as variáveis, você **DEVE** fazer um novo deploy:

```bash
vercel --prod
```

**⚠️ IMPORTANTE:** As variáveis só são carregadas em **novos deploys**. Um deploy existente não vai pegar as variáveis novas.

## 🔍 Como Verificar se Funcionou

### 1. Verificar no Console (Após Novo Deploy)

1. Abra a página: `localizaqui.com`
2. Pressione F12
3. Vá na aba "Console"
4. **NÃO deve aparecer:**
   - ❌ `Supabase não configurado!`
   - ❌ `missingUrl: true`
   - ❌ `placeholder.supabase.co`

5. **Deve aparecer (em dev):**
   - ✅ `🔍 Debug Supabase Config:` com `hasUrl: true` e `hasKey: true`

### 2. Tentar Cadastro

1. Preencha o formulário de cadastro
2. Clique em "Criar Conta"
3. **NÃO deve aparecer:**
   - ❌ "Erro de configuração: Variáveis de ambiente..."
   - ❌ "Failed to fetch"
   - ❌ "ERR_NAME_NOT_RESOLVED"

4. **Deve funcionar:**
   - ✅ Cadastro realizado com sucesso
   - ✅ Redirecionamento para página de sucesso

## 📋 Checklist Completo

- [ ] Acessei o Supabase Dashboard
- [ ] Copiei a Project URL
- [ ] Copiei a anon public key
- [ ] Acessei Vercel > Settings > Environment Variables
- [ ] Adicionei `VITE_SUPABASE_URL` com a URL correta
- [ ] Marquei Production, Preview e Development
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY` com a chave correta
- [ ] Marquei Production, Preview e Development
- [ ] Fiz um novo deploy (`vercel --prod`)
- [ ] Aguardei o deploy completar
- [ ] Testei no navegador (F12 > Console)
- [ ] Tentei fazer um cadastro

## 🆘 Se Ainda Não Funcionar

### Verificar se as Variáveis Foram Salvas

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Verifique se aparecem na lista:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Verifique se estão marcadas para **Production**

### Verificar se o Deploy Foi Feito

1. Acesse: https://vercel.com/seu-projeto/deployments
2. Verifique se há um deploy **recente** (após adicionar as variáveis)
3. Clique no deploy e veja os logs

### Verificar Nome das Variáveis

- ✅ **Correto:** `VITE_SUPABASE_URL` (com `VITE_` no início)
- ❌ **Incorreto:** `SUPABASE_URL` (sem `VITE_`)

No Vite, variáveis do frontend **DEVEM** começar com `VITE_`

### Verificar Valor das Variáveis

- **URL:** Deve ser `https://rwlzlkgcgvpahyhvczbc.supabase.co` (sem barra no final)
- **Key:** Deve começar com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (é um JWT)

## 🔗 Links Diretos

- **Vercel Environment Variables:** https://vercel.com/seu-projeto/settings/environment-variables
- **Supabase API Settings:** https://supabase.com/dashboard/project/_/settings/api

## ⚡ Comando Rápido para Deploy

Após configurar as variáveis, execute:

```bash
vercel --prod
```

Aguarde o deploy completar (cerca de 30-60 segundos) e teste novamente.

