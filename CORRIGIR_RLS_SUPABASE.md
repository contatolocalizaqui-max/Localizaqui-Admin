# 🔧 Corrigir Avisos RLS do Supabase

## 🔴 Problemas Identificados

O Supabase Database Linter identificou dois tipos de problemas de performance nas políticas RLS:

### 1. **auth_rls_initplan** (5 avisos)
As políticas estão reavaliando `auth.uid()` para cada linha, causando performance subótima.

**Tabelas afetadas:**
- `users` - Política "Users can view own data"
- `profiles` - Política "Users can manage own profiles"
- `demands` - Política "Users can manage own demands"
- `proposals` - Política "Proposals viewable by demand owner or provider"
- `subscriptions` - Política "Subscriptions are private"

**Solução:** Substituir `auth.uid()` por `(select auth.uid())` para que seja avaliado uma vez por query.

### 2. **multiple_permissive_policies** (8 avisos)
Múltiplas políticas permissivas para a mesma role e action, causando execução redundante.

**Tabelas afetadas:**
- `demands` - 4 avisos (roles: anon, authenticated, authenticator, dashboard_user)
- `profiles` - 4 avisos (roles: anon, authenticated, authenticator, dashboard_user)

**Solução:** Consolidar políticas múltiplas em uma única política usando OR.

## ✅ Correções Aplicadas

Criei o arquivo `FIX_RLS_POLICIES.sql` que:

1. ✅ Remove todas as políticas antigas
2. ✅ Cria políticas otimizadas usando `(select auth.uid())`
3. ✅ Consolida políticas múltiplas em políticas únicas com OR
4. ✅ Mantém a mesma funcionalidade de segurança

## 📋 Como Aplicar as Correções

### Passo 1: Acessar Supabase SQL Editor

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/sql/new
2. Ou: Dashboard > SQL Editor > New Query

### Passo 2: Executar o Script

1. Abra o arquivo `FIX_RLS_POLICIES.sql`
2. Copie todo o conteúdo
3. Cole no SQL Editor do Supabase
4. Clique em "Run" ou pressione Ctrl+Enter

### Passo 3: Verificar Resultado

O script inclui uma query de verificação no final que lista todas as políticas criadas. Você deve ver:

- **users**: 1 política (SELECT)
- **profiles**: 2 políticas (SELECT consolidada + ALL para gerenciamento)
- **demands**: 2 políticas (SELECT consolidada + ALL para gerenciamento)
- **proposals**: 1 política (SELECT)
- **subscriptions**: 1 política (ALL)

### Passo 4: Verificar no Database Linter

1. Acesse: https://supabase.com/dashboard/project/seu-projeto/database/linter
2. Os avisos devem desaparecer após alguns minutos

## 🔍 Detalhes das Correções

### Antes (Ineficiente):
```sql
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

### Depois (Otimizado):
```sql
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING ((select auth.uid()) = id);
```

### Consolidação de Políticas Múltiplas

**Antes (Ineficiente - 2 políticas):**
```sql
CREATE POLICY "Public profiles are viewable" ON profiles
  FOR SELECT USING (published = true);

CREATE POLICY "Users can manage own profiles" ON profiles
  FOR ALL USING (auth.uid() = user_id);
```

**Depois (Otimizado - 1 política consolidada):**
```sql
CREATE POLICY "Profiles access policy" ON profiles
  FOR SELECT USING (
    published = true OR 
    (select auth.uid()) = user_id
  );
```

## ⚠️ Importante

- As correções **não alteram a segurança** - apenas otimizam a performance
- As políticas continuam funcionando exatamente da mesma forma
- Usuários ainda só podem ver/editar seus próprios dados
- Perfis e demandas públicos continuam visíveis para todos

## 📊 Benefícios

- ✅ **Performance melhorada** em queries com muitas linhas
- ✅ **Menos avisos** no Database Linter
- ✅ **Código mais limpo** e manutenível
- ✅ **Mesma segurança** garantida

## 🆘 Se Algo Der Errado

Se houver algum problema após executar o script:

1. **Verificar logs de erro** no SQL Editor
2. **Verificar se as políticas foram criadas** usando a query de verificação
3. **Restaurar políticas antigas** se necessário (elas estão no `SCHEMA_CONSOLIDADO.sql`)

## 📝 Notas Técnicas

- `(select auth.uid())` é avaliado uma vez por query, não por linha
- Isso reduz significativamente o overhead em queries com muitas linhas
- A consolidação de políticas reduz o número de verificações necessárias
- PostgreSQL otimiza melhor políticas únicas do que múltiplas

