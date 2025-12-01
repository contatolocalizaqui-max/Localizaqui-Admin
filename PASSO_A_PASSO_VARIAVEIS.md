# 🎯 PASSO A PASSO - Configurar Variáveis no Vercel

## ❌ Problema Confirmado

A requisição está indo para:
- ❌ `https://placeholder.supabase.co/auth/v1/signup`
- ❌ Headers mostram: `Apikey: placeholder-key`

**Isso significa que as variáveis NÃO estão configuradas no Vercel.**

## ✅ SOLUÇÃO PASSO A PASSO

### PASSO 1: Obter Chaves do Supabase

1. Abra: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em: **Settings** (⚙️) → **API**
4. Você verá duas informações:

   **a) Project URL:**
   ```
   https://rwlzlkgcgvpahyhvczbc.supabase.co
   ```
   - Clique no ícone de copiar ao lado
   - **Copie esta URL completa**

   **b) anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bHpsa2djZ3ZwYXloeHZjemJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODAwMjEsImV4cCI6MjA3OTg1NjAyMX0.LKoXCz5T8Xsl5mJSse1GKW9jJ52U8_kbf6vMAdyvaqs
   ```
   - Clique no ícone de copiar ao lado
   - **Copie esta chave completa** (é uma string longa)

### PASSO 2: Acessar Vercel

1. Abra: https://vercel.com/dashboard
2. Clique no seu projeto **"localizaqui-admin"** (ou o nome do seu projeto)
3. Vá em: **Settings** (no menu lateral)
4. Clique em: **Environment Variables** (na lista de opções)

### PASSO 3: Adicionar Primeira Variável

1. Clique no botão **"Add New"** (ou "Adicionar Nova")
2. Preencha:
   - **Key (Nome):** `VITE_SUPABASE_URL`
   - **Value (Valor):** Cole a URL que você copiou: `https://rwlzlkgcgvpahyhvczbc.supabase.co`
   - **Environments (Ambientes):**
     - ✅ Marque **Production**
     - ✅ Marque **Preview**
     - ✅ Marque **Development**
3. Clique em **"Save"** (ou "Salvar")

### PASSO 4: Adicionar Segunda Variável

1. Clique em **"Add New"** novamente
2. Preencha:
   - **Key (Nome):** `VITE_SUPABASE_ANON_KEY`
   - **Value (Valor):** Cole a chave anon que você copiou (a string longa)
   - **Environments (Ambientes):**
     - ✅ Marque **Production**
     - ✅ Marque **Preview**
     - ✅ Marque **Development**
3. Clique em **"Save"** (ou "Salvar")

### PASSO 5: Verificar se Foram Salvas

Você deve ver na lista:
- ✅ `VITE_SUPABASE_URL` - Production, Preview, Development
- ✅ `VITE_SUPABASE_ANON_KEY` - Production, Preview, Development

### PASSO 6: Fazer Novo Deploy

**⚠️ CRÍTICO:** As variáveis só funcionam em **NOVOS DEPLOYS**!

Execute no terminal:
```bash
vercel --prod
```

Aguarde o deploy completar (cerca de 30-60 segundos).

## ✅ Como Verificar se Funcionou

### 1. Verificar no Network Tab

1. Abra: `localizaqui.com`
2. Pressione **F12**
3. Vá na aba **"Network"** (ou "Rede")
4. Tente fazer um cadastro
5. Procure pela requisição `signup`
6. **NÃO deve aparecer:**
   - ❌ `placeholder.supabase.co`
   - ❌ `placeholder-key`

7. **Deve aparecer:**
   - ✅ `rwlzlkgcgvpahyhvczbc.supabase.co`
   - ✅ A chave anon real (não `placeholder-key`)

### 2. Verificar no Console

1. F12 > Console
2. **NÃO deve aparecer:**
   - ❌ `Supabase não configurado!`
   - ❌ `missingUrl: true`

### 3. Tentar Cadastro

1. Preencha o formulário
2. Clique em "Criar Conta"
3. **Deve funcionar agora!**

## 🆘 Se Ainda Não Funcionar

### Verificar se as Variáveis Estão Corretas

1. Volte em: Vercel > Settings > Environment Variables
2. Clique em cada variável
3. Verifique:
   - O nome está correto? (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)
   - O valor está correto? (sem espaços extras, sem quebras de linha)
   - Está marcado para Production?

### Verificar se o Deploy Foi Feito

1. Vercel > Deployments
2. O deploy mais recente deve ser de **agora** (após você adicionar as variáveis)
3. Se não houver deploy recente, execute `vercel --prod` novamente

### Verificar Nome das Variáveis

- ✅ **Correto:** `VITE_SUPABASE_URL` (com `VITE_` no início)
- ❌ **Errado:** `SUPABASE_URL` (sem `VITE_`)

**No Vite, variáveis do frontend DEVEM começar com `VITE_`**

## 📸 Screenshots Esperados

### No Vercel (após configurar):
```
Environment Variables
├── VITE_SUPABASE_URL
│   └── Production, Preview, Development
└── VITE_SUPABASE_ANON_KEY
    └── Production, Preview, Development
```

### No Network Tab (após funcionar):
```
Request URL: https://rwlzlkgcgvpahyhvczbc.supabase.co/auth/v1/signup
Headers:
  Apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (chave real)
```

## 🔗 Links Diretos

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Environment Variables:** https://vercel.com/seu-projeto/settings/environment-variables
- **Supabase API Settings:** https://supabase.com/dashboard/project/_/settings/api

## ⚡ Comando Final

Após configurar as variáveis, execute:

```bash
vercel --prod
```

**Execute este comando DEPOIS de adicionar as variáveis!**

