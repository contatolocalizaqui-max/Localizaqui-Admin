-- ============================================
-- CORREÇÃO DE POLÍTICAS RLS - OTIMIZAÇÃO DE PERFORMANCE
-- Execute este script no Supabase SQL Editor
-- ============================================
-- Este script corrige os avisos do Supabase Database Linter:
-- 1. auth_rls_initplan: Usa (select auth.uid()) em vez de auth.uid()
-- 2. multiple_permissive_policies: Consolida políticas múltiplas
-- ============================================

-- ============================================
-- PARTE 1: Remover políticas antigas
-- ============================================

-- Remover políticas da tabela users
DROP POLICY IF EXISTS "Users can view own data" ON users;

-- Remover políticas da tabela profiles
DROP POLICY IF EXISTS "Public profiles are viewable" ON profiles;
DROP POLICY IF EXISTS "Users can manage own profiles" ON profiles;

-- Remover políticas da tabela demands
DROP POLICY IF EXISTS "Open demands are public" ON demands;
DROP POLICY IF EXISTS "Users can manage own demands" ON demands;

-- Remover políticas da tabela proposals
DROP POLICY IF EXISTS "Proposals viewable by demand owner or provider" ON proposals;

-- Remover políticas da tabela subscriptions
DROP POLICY IF EXISTS "Subscriptions are private" ON subscriptions;

-- ============================================
-- PARTE 2: Criar políticas otimizadas
-- ============================================

-- ============================================
-- TABELA: users
-- ============================================
-- Política otimizada: Usuários podem ver seus próprios dados
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING ((select auth.uid()) = id);

-- Política para permitir INSERT: Usuários podem criar seu próprio registro
-- (Normalmente feito pelo trigger, mas necessário caso o trigger falhe)
CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- Política para permitir UPDATE: Usuários podem atualizar seus próprios dados
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING ((select auth.uid()) = id);

-- ============================================
-- TABELA: profiles
-- ============================================
-- Política consolidada: Perfis públicos OU próprios perfis
-- Isso resolve o problema de múltiplas políticas permissivas
CREATE POLICY "Profiles access policy" ON profiles
  FOR SELECT USING (
    published = true OR 
    (select auth.uid()) = user_id
  );

-- Política para gerenciar próprios perfis (INSERT, UPDATE, DELETE)
CREATE POLICY "Users can manage own profiles" ON profiles
  FOR ALL USING ((select auth.uid()) = user_id);

-- ============================================
-- TABELA: demands
-- ============================================
-- Política consolidada: Demandas abertas OU próprias demandas
-- Isso resolve o problema de múltiplas políticas permissivas
CREATE POLICY "Demands access policy" ON demands
  FOR SELECT USING (
    status = 'aberta' OR 
    (select auth.uid()) = user_id
  );

-- Política para gerenciar próprias demandas (INSERT, UPDATE, DELETE)
CREATE POLICY "Users can manage own demands" ON demands
  FOR ALL USING ((select auth.uid()) = user_id);

-- ============================================
-- TABELA: proposals
-- ============================================
-- Política otimizada: Propostas visíveis pelo dono da demanda ou prestador
CREATE POLICY "Proposals viewable by demand owner or provider" ON proposals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM demands 
      WHERE id = proposals.demand_id 
      AND user_id = (select auth.uid())
    ) OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = proposals.provider_id 
      AND user_id = (select auth.uid())
    )
  );

-- ============================================
-- TABELA: subscriptions
-- ============================================
-- Política otimizada: Assinaturas são privadas
CREATE POLICY "Subscriptions are private" ON subscriptions
  FOR ALL USING ((select auth.uid()) = user_id);

-- ============================================
-- PARTE 3: Verificar se o trigger existe
-- ============================================
-- O trigger handle_new_user() cria automaticamente o registro na tabela users
-- quando um usuário é criado no auth.users. Ele usa SECURITY DEFINER, então
-- não precisa de política RLS. Mas adicionamos políticas de INSERT/UPDATE
-- como fallback caso o trigger falhe.

-- Verificar se o trigger existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    RAISE WARNING 'Trigger on_auth_user_created não encontrado! Execute FIX_USERS_TABLE.sql ou SCHEMA_CONSOLIDADO.sql';
  END IF;
END $$;

-- ============================================
-- FIM DO SCRIPT
-- ============================================

-- Verificação: Listar todas as políticas criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('users', 'profiles', 'demands', 'proposals', 'subscriptions')
ORDER BY tablename, policyname;

