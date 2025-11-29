import express from 'express';
import { supabaseAdmin } from '../index.js';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas as rotas de admin requerem autenticação e privilégios de admin
router.use(authenticate);
router.use(requireAdmin);

/**
 * GET /api/admin/stats
 * Estatísticas gerais da plataforma
 */
router.get('/stats', async (req, res) => {
  try {
    // Contar usuários
    const { count: usersCount } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Contar perfis
    const { count: profilesCount } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Contar demandas
    const { count: demandsCount } = await supabaseAdmin
      .from('demands')
      .select('*', { count: 'exact', head: true });

    // Contar propostas
    const { count: proposalsCount } = await supabaseAdmin
      .from('proposals')
      .select('*', { count: 'exact', head: true });

    // Receita mensal
    const { data: subscriptions } = await supabaseAdmin
      .from('subscriptions')
      .select('price')
      .eq('status', 'active');

    const monthlyRevenue = subscriptions?.reduce((sum, sub) => sum + (sub.price || 0), 0) || 0;

    res.json({
      stats: {
        users: usersCount || 0,
        profiles: profilesCount || 0,
        demands: demandsCount || 0,
        proposals: proposalsCount || 0,
        monthlyRevenue,
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/users
 * Listar todos os usuários
 */
router.get('/users', async (req, res) => {
  try {
    const { limit = 50, offset = 0, search } = req.query;

    let query = supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (search) {
      query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ users: data || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/admin/users/:id/ban
 * Banir usuário
 */
router.put('/users/:id/ban', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // Atualizar usuário no Supabase Auth
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      ban_duration: '876000h' // ~100 anos (efetivamente permanente)
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Registrar ban no banco
    await supabaseAdmin
      .from('user_bans')
      .insert([{
        user_id: id,
        reason,
        banned_by: req.user?.id,
        banned_at: new Date().toISOString(),
      }]);

    res.json({ message: 'Usuário banido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/verifications
 * Listar verificações pendentes
 */
router.get('/verifications', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profile_verifications')
      .select('*, profile:profiles(*)')
      .eq('status', 'pending')
      .order('submitted_at', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ verifications: data || [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/admin/verifications/:id/approve
 * Aprovar verificação
 */
router.put('/verifications/:id/approve', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Atualizar verificação
    await supabaseAdmin
      .from('profile_verifications')
      .update({ 
        status: 'approved',
        reviewed_by: req.user?.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id);

    // Atualizar perfil como verificado
    const { data: verification } = await supabaseAdmin
      .from('profile_verifications')
      .select('profile_id')
      .eq('id', id)
      .single();

    if (verification) {
      await supabaseAdmin
        .from('profiles')
        .update({ verified: true })
        .eq('id', verification.profile_id);
    }

    res.json({ message: 'Verificação aprovada' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

