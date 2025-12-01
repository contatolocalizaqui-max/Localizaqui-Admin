# 📊 DDL Completa - Localizaqui Database

## 📁 Arquivos DDL

### 1. **SCHEMA_CONSOLIDADO.sql** - Schema Principal
Contém toda a estrutura do banco de dados:
- ✅ Criação de tabelas
- ✅ Índices
- ✅ Row Level Security (RLS)
- ✅ Políticas RLS básicas
- ✅ Triggers e funções

### 2. **FIX_RLS_POLICIES.sql** - Otimização de Políticas RLS
Corrige e otimiza as políticas RLS:
- ✅ Usa `(select auth.uid())` para melhor performance
- ✅ Consolida políticas múltiplas
- ✅ Adiciona políticas INSERT/UPDATE para users

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### 1. **users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'client', -- 'client', 'provider', 'admin'
  account_type TEXT DEFAULT 'individual', -- 'individual', 'company'
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. **profiles**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  cpf TEXT,
  cnpj TEXT,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_whatsapp BOOLEAN DEFAULT TRUE,
  service_category TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  experience_level TEXT,
  location TEXT NOT NULL,
  service_radius INTEGER DEFAULT 0,
  availability_schedule JSONB,
  emergency BOOLEAN DEFAULT FALSE,
  social_links JSONB,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  is_subscriber BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  gallery_images TEXT[],
  stripe_connect_account_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);
```

#### 3. **demands**
```sql
CREATE TABLE demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency TEXT NOT NULL, -- 'imediata', 'nesta_semana', 'flexivel'
  budget JSONB, -- {min: number, max: number}
  images TEXT[],
  status TEXT DEFAULT 'aberta', -- 'aberta', 'em_andamento', 'concluida', 'pausada'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. **proposals**
```sql
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id UUID NOT NULL REFERENCES demands(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT NOT NULL,
  estimated_time TEXT NOT NULL,
  status TEXT DEFAULT 'sent', -- 'sent', 'viewed', 'accepted', 'rejected'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. **subscriptions**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL, -- 'starter', 'pro', 'business'
  plan_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'past_due'
  payment_method TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_price_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ
);
```

#### 6. **reviews**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7. **profile_verifications**
```sql
CREATE TABLE profile_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  documents JSONB,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ
);
```

#### 8. **user_bans**
```sql
CREATE TABLE user_bans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT,
  banned_by UUID NOT NULL REFERENCES users(id),
  banned_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 9. **stripe_events**
```sql
CREATE TABLE stripe_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 10. **transactions**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  demand_id UUID REFERENCES demands(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  stripe_transfer_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  provider_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'brl',
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'refunded'
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

## 🔐 Políticas RLS (Row Level Security)

### Tabela: users
- ✅ `Users can view own data` - SELECT
- ✅ `Users can insert own data` - INSERT
- ✅ `Users can update own data` - UPDATE

### Tabela: profiles
- ✅ `Profiles access policy` - SELECT (consolidada)
- ✅ `Users can manage own profiles` - ALL

### Tabela: demands
- ✅ `Demands access policy` - SELECT (consolidada)
- ✅ `Users can manage own demands` - ALL

### Tabela: proposals
- ✅ `Proposals viewable by demand owner or provider` - SELECT

### Tabela: subscriptions
- ✅ `Subscriptions are private` - ALL

## 🔧 Triggers e Funções

### Trigger: on_auth_user_created
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Função: handle_new_user()
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, account_type, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    COALESCE(NEW.raw_user_meta_data->>'accountType', 'individual'),
    COALESCE((NEW.raw_user_meta_data->>'isAdmin')::boolean, false)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, users.name),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 📊 Índices

### Profiles
- `idx_profiles_user_id`
- `idx_profiles_location`
- `idx_profiles_published`
- `idx_profiles_is_subscriber`
- `idx_profiles_stripe_connect_account_id`

### Demands
- `idx_demands_user_id`
- `idx_demands_status`
- `idx_demands_location`

### Proposals
- `idx_proposals_demand_id`
- `idx_proposals_provider_id`

### Subscriptions
- `idx_subscriptions_user_id`
- `idx_subscriptions_status`
- `idx_subscriptions_stripe_customer_id`
- `idx_subscriptions_stripe_subscription_id`

### Stripe Events
- `idx_stripe_events_stripe_event_id`
- `idx_stripe_events_processed`

### Transactions
- `idx_transactions_customer_id`
- `idx_transactions_provider_id`
- `idx_transactions_status`
- `idx_transactions_stripe_payment_intent_id`

## 🚀 Como Aplicar

### Passo 1: Schema Principal
Execute `SCHEMA_CONSOLIDADO.sql` no Supabase SQL Editor

### Passo 2: Otimizar Políticas RLS
Execute `FIX_RLS_POLICIES.sql` no Supabase SQL Editor

## 📝 Notas

- Todas as tabelas têm RLS habilitado
- Políticas RLS usam `(select auth.uid())` para melhor performance
- Trigger automático cria registro em `users` quando usuário é criado no `auth.users`
- Políticas consolidadas resolvem avisos de múltiplas políticas permissivas

