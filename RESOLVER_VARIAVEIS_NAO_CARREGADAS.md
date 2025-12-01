# 🔧 Resolver: Variáveis Não Carregadas no Build

## ❌ Problema

Mesmo com as variáveis configuradas no Vercel, o console ainda mostra:
```
❌ Supabase não configurado!
{missingUrl: true, missingKey: true, envKeys: Array(0)}
```

## 🔍 Possíveis Causas

### 1. **Cache do Navegador**
O navegador pode estar usando uma versão antiga do JavaScript.

**Solução:**
- Pressione **Ctrl + Shift + R** (ou **Cmd + Shift + R** no Mac) para fazer hard refresh
- Ou limpe o cache do navegador

### 2. **Deploy Antes das Variáveis**
Se você fez o deploy ANTES de adicionar as variáveis, elas não estarão no build.

**Solução:**
- Faça um novo deploy APÓS adicionar as variáveis:
  ```bash
  vercel --prod
  ```

### 3. **Variáveis Não Disponíveis no Build Time**
O Vite precisa das variáveis no momento do build.

**Solução:**
- Verifique se as variáveis estão marcadas para **Production**
- Verifique se o nome está correto: `VITE_SUPABASE_URL` (com `VITE_`)

### 4. **Build Cache do Vercel**
O Vercel pode estar usando cache de build antigo.

**Solução:**
- No Vercel Dashboard, vá em Deployments
- Clique nos três pontos do último deploy
- Selecione "Redeploy" (não "Redeploy with existing Build Cache")

## ✅ Solução Passo a Passo

### Passo 1: Verificar Variáveis no Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Verifique se aparecem:
   - ✅ `VITE_SUPABASE_URL`
   - ✅ `VITE_SUPABASE_ANON_KEY`
3. Clique em cada uma e verifique:
   - O valor está correto?
   - Está marcado para **Production**?

### Passo 2: Fazer Hard Refresh no Navegador

1. Abra: `localizaqui.com`
2. Pressione **Ctrl + Shift + R** (Windows) ou **Cmd + Shift + R** (Mac)
3. Isso força o navegador a baixar tudo novamente

### Passo 3: Fazer Novo Deploy (Sem Cache)

1. No terminal, execute:
   ```bash
   vercel --prod --force
   ```

2. Ou no Vercel Dashboard:
   - Vá em Deployments
   - Clique nos três pontos do último deploy
   - Selecione "Redeploy" (sem cache)

### Passo 4: Verificar Logs do Build

1. Acesse: https://vercel.com/seu-projeto/deployments
2. Clique no deploy mais recente
3. Veja os logs do build
4. Procure por:
   - ✅ Variáveis sendo carregadas
   - ❌ Erros relacionados a variáveis

### Passo 5: Verificar no Console

1. Abra: `localizaqui.com`
2. Pressione **F12**
3. Vá na aba **Console**
4. Procure por: `🔍 Debug Supabase Config:`
5. Deve mostrar:
   - `hasUrl: true`
   - `hasKey: true`
   - `urlPreview: "https://rwlzlkgcgvpahyhvczbc..."`

## 🆘 Se Ainda Não Funcionar

### Verificar Nome das Variáveis

- ✅ **Correto:** `VITE_SUPABASE_URL` (com `VITE_` no início)
- ❌ **Errado:** `SUPABASE_URL` (sem `VITE_`)

**No Vite, variáveis do frontend DEVEM começar com `VITE_`**

### Verificar Valor das Variáveis

1. No Vercel, clique em cada variável
2. Verifique:
   - Não há espaços extras no início/fim?
   - Não há quebras de linha?
   - A URL está completa? (`https://rwlzlkgcgvpahyhvczbc.supabase.co`)
   - A chave está completa? (string longa começando com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Verificar Ambiente

Certifique-se de que as variáveis estão marcadas para:
- ✅ **Production** (obrigatório)
- ✅ **Preview** (recomendado)
- ✅ **Development** (opcional)

### Limpar Cache do Vercel

1. No Vercel Dashboard, vá em Deployments
2. Clique nos três pontos do último deploy
3. Selecione "Redeploy" (não "Redeploy with existing Build Cache")
4. Aguarde o deploy completar

## 📋 Checklist Final

- [ ] Variáveis configuradas no Vercel
- [ ] Variáveis marcadas para Production
- [ ] Nome correto (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)
- [ ] Valores corretos (sem espaços, completos)
- [ ] Novo deploy feito APÓS adicionar variáveis
- [ ] Hard refresh no navegador (Ctrl+Shift+R)
- [ ] Console mostra `hasUrl: true` e `hasKey: true`
- [ ] Network tab mostra requisições para URL real (não placeholder)

## 🔗 Links Úteis

- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html

