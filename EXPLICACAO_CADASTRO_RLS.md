# ✅ Como Funciona o Cadastro com as Políticas RLS

## 🔄 Fluxo de Cadastro

Quando um novo usuário se cadastra, acontece o seguinte:

### 1. **Criação no Auth (Supabase Auth)**
```typescript
const { data } = await supabase.auth.signUp({
  email: formData.email,
  password: formData.password,
  // ...
});
```
- Cria o usuário na tabela `auth.users` (gerenciada pelo Supabase)
- **Não precisa de política RLS** - é gerenciado pelo Supabase Auth

### 2. **Criação Automática na Tabela `users` (via Trigger)**
```sql
-- Trigger automático (SECURITY DEFINER)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

- O trigger `handle_new_user()` **executa automaticamente** quando um usuário é criado
- Usa `SECURITY DEFINER`, então **não precisa de política RLS**
- Cria o registro na tabela `public.users` automaticamente

### 3. **INSERT Manual (Fallback - Opcional)**
```typescript
// Código no RegisterPage.tsx (linha 93-101)
const { error: dbError } = await supabase
  .from('users')
  .insert({
    id: data.user.id,
    name: formData.name,
    email: formData.email,
    // ...
  });
```

- Este INSERT é um **fallback** caso o trigger falhe
- **Agora funciona** porque adicionamos a política `"Users can insert own data"`

## 🔐 Políticas RLS Necessárias

### Tabela `users`:

1. ✅ **SELECT**: `"Users can view own data"`
   - Permite que usuários vejam seus próprios dados
   - Usa `(select auth.uid()) = id`

2. ✅ **INSERT**: `"Users can insert own data"` (NOVO)
   - Permite que usuários criem seu próprio registro
   - Usa `(select auth.uid()) = id`
   - **Necessário para o fallback manual**

3. ✅ **UPDATE**: `"Users can update own data"` (NOVO)
   - Permite que usuários atualizem seus próprios dados
   - Usa `(select auth.uid()) = id`

## ✅ Por Que Funciona Agora

### Antes (Problema):
- ❌ Só tinha política de SELECT
- ❌ INSERT manual falhava com erro de RLS
- ✅ Trigger funcionava (mas sem fallback)

### Depois (Corrigido):
- ✅ Política de SELECT (ver dados)
- ✅ Política de INSERT (criar registro - fallback)
- ✅ Política de UPDATE (atualizar dados)
- ✅ Trigger continua funcionando (método principal)

## 🎯 Resultado

Com as correções aplicadas:

1. ✅ **Trigger funciona** (método principal - automático)
2. ✅ **INSERT manual funciona** (fallback - se necessário)
3. ✅ **Performance otimizada** (usa `(select auth.uid())`)
4. ✅ **Segurança mantida** (usuários só podem criar/ver/editar seus próprios dados)

## 📋 Checklist para Cadastro Funcionar

- [x] Trigger `on_auth_user_created` existe (cria automaticamente)
- [x] Política RLS de SELECT existe (ver dados)
- [x] Política RLS de INSERT existe (criar registro - fallback)
- [x] Política RLS de UPDATE existe (atualizar dados)
- [x] Políticas usam `(select auth.uid())` (otimizado)

## 🚀 Como Testar

1. Execute o script `FIX_RLS_POLICIES.sql` no Supabase
2. Tente criar um novo cadastro
3. Verifique se o usuário foi criado:
   ```sql
   SELECT * FROM users WHERE email = 'seu-email@exemplo.com';
   ```

## ⚠️ Importante

- O **trigger é o método principal** - ele cria automaticamente
- O **INSERT manual é um fallback** - só é necessário se o trigger falhar
- As **políticas RLS garantem segurança** - usuários só acessam seus próprios dados
- As **políticas estão otimizadas** - usam `(select auth.uid())` para melhor performance

