
import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { TicketIcon } from '../components/icons/TicketIcon';
import { PlusCircleIcon } from '../components/icons/PlusCircleIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { Page } from '../types';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { TagIcon } from '../components/icons/TagIcon';
import { cn } from '../utils/cn';
import { BanIcon } from '../components/icons/BanIcon';
import { CheckCircle2Icon } from '../components/icons/CheckCircle2Icon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';
import { FlagIcon } from '../components/icons/FlagIcon';
import { CogIcon } from '../components/icons/CogIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';
import { XIcon } from '../components/icons/XIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { BanknotesIcon } from '../components/icons/BanknotesIcon';
import { DocumentTextIcon } from '../components/icons/DocumentTextIcon';
import { LoadingSpinner } from '../components/icons/LoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

interface AdminPageProps {
    onNavigate: (page: Page) => void;
}

type AdminTab = 'overview' | 'verification' | 'users' | 'team' | 'finance' | 'vouchers' | 'settings';

// --- MOCK DATA GENERATORS ---
const generateRevenueData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
        month: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
        revenue: Math.floor(Math.random() * 50000) + 10000
    }));
};

// --- SUB-COMPONENTS ---

const KPICard: React.FC<{ title: string; value: string; trend?: string; trendUp?: boolean; icon: React.ReactNode; color: string }> = ({ title, value, trend, trendUp, icon, color }) => (
    <div className="bg-[#111] border border-gray-800 p-5 rounded-xl hover:border-gray-700 transition-all group relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-24 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${color.replace('text-', 'bg-')}`}></div>
        <div className="flex justify-between items-start mb-3 relative z-10">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.replace('text-', 'bg-').replace('500', '500/10')} ${color} border border-white/5`}>
                {icon}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    <TrendingUpIcon className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
                    {trend}
                </div>
            )}
        </div>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest relative z-10">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-[#20FF82] transition-colors relative z-10">{value}</h3>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        verified: "bg-[#20FF82]/10 text-[#20FF82] border-[#20FF82]/20",
        pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        banned: "bg-red-500/10 text-red-400 border-red-500/20",
        rejected: "bg-gray-500/10 text-gray-400 border-gray-500/20"
    };
    return (
        <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border", styles[status] || styles.rejected)}>
            {status}
        </span>
    );
};

// --- TABS CONTENT ---

const OverviewTab = () => (
    <div className="space-y-6 animate-fade-in">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="MRR (Receita Recorrente)" value="R$ 42.590" trend="+8.5%" trendUp={true} icon={<BanknotesIcon className="w-5 h-5"/>} color="text-[#20FF82]" />
            <KPICard title="Prestadores Ativos" value="842" trend="+12%" trendUp={true} icon={<UsersIcon className="w-5 h-5"/>} color="text-blue-500" />
            <KPICard title="Demandas Hoje" value="156" trend="-3%" trendUp={false} icon={<TicketIcon className="w-5 h-5"/>} color="text-purple-500" />
            <KPICard title="Taxa de Match" value="92%" trend="+1%" trendUp={true} icon={<SparklesIcon className="w-5 h-5"/>} color="text-amber-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Ops - Critical Needs */}
            <div className="lg:col-span-2 bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <GlobeIcon className="w-5 h-5 text-blue-500" />
                        Live Operations
                    </h3>
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
                
                {/* Danger Zone: Unanswered Demands */}
                <div className="flex-1 space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Demandas Críticas (Sem resposta > 1h)</p>
                    {[
                        { id: '#D-921', title: 'Vazamento em Apartamento', loc: 'Pinheiros, SP', time: '1h 20min' },
                        { id: '#D-925', title: 'Eletricista de Emergência', loc: 'Centro, RJ', time: '45min' },
                    ].map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-red-900/10 border border-red-900/30 rounded-lg hover:bg-red-900/20 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs group-hover:bg-red-500 group-hover:text-white transition-colors">!</div>
                                <div>
                                    <p className="text-sm font-bold text-white">{d.title}</p>
                                    <p className="text-xs text-gray-500">{d.id} • {d.loc}</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-red-400">{d.time}</span>
                        </div>
                    ))}
                    
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 mb-2">Atividade Recente</p>
                    {[
                        { text: "Novo assinante Pro: Mário Pinturas", time: "2 min", type: "revenue" },
                        { text: "Disputa resolvida automaticamente", time: "5 min", type: "system" },
                        { text: "340 notificações push enviadas", time: "10 min", type: "system" },
                    ].map((log, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 border-b border-gray-800/50 last:border-0">
                            <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'revenue' ? 'bg-[#20FF82]' : 'bg-blue-500'}`}></div>
                            <span className="text-xs text-gray-300 flex-1">{log.text}</span>
                            <span className="text-[10px] text-gray-600 font-mono">{log.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Revenue Mini Chart */}
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Crescimento</h3>
                    <p className="text-xs text-gray-500">Novas Assinaturas (Ult. 30 dias)</p>
                </div>
                
                <div className="h-40 flex items-end gap-1 mt-6">
                    {generateRevenueData().slice(0,12).map((d, i) => (
                        <div key={i} className="flex-1 bg-gray-800 hover:bg-[#20FF82] transition-colors rounded-t-sm relative group" style={{ height: `${Math.random() * 100}%` }}>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {d.revenue}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const VerificationQueueTab = () => {
    const [queue, setQueue] = useState([
        { id: 1, name: 'João Pedro Elétrica', doc: 'CPF 123***', type: 'Eletricista', submitted: '2 horas atrás', status: 'pending' },
        { id: 2, name: 'Limpeza Total Ltda', doc: 'CNPJ 45.***', type: 'Limpeza', submitted: '5 horas atrás', status: 'pending' },
        { id: 3, name: 'Marcos Reparos', doc: 'CPF 987***', type: 'Marido de Aluguel', submitted: '1 dia atrás', status: 'pending' },
    ]);

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        setQueue(prev => prev.filter(item => item.id !== id));
        // Here you would call API
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">Fila de Verificação</h2>
                    <p className="text-sm text-gray-400">Profissionais aguardando aprovação de documentos.</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-bold border border-amber-500/20">
                    {queue.length} Pendentes
                </span>
            </div>

            <div className="grid gap-4">
                {queue.length === 0 ? (
                    <div className="text-center py-12 bg-[#111] rounded-xl border border-dashed border-gray-800">
                        <CheckCircle2Icon className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500">Tudo limpo! Sem verificações pendentes.</p>
                    </div>
                ) : (
                    queue.map(item => (
                        <div key={item.id} className="bg-[#111] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-700 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                    <DocumentTextIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{item.name}</h3>
                                    <p className="text-xs text-gray-500 flex gap-2">
                                        <span>{item.type}</span> • <span>{item.doc}</span> • <span>{item.submitted}</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-colors">
                                    Ver Docs
                                </button>
                                <button onClick={() => handleAction(item.id, 'reject')} className="flex-1 sm:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg transition-colors">
                                    Rejeitar
                                </button>
                                <button onClick={() => handleAction(item.id, 'approve')} className="flex-1 sm:flex-none px-4 py-2 bg-[#20FF82] hover:bg-[#1ce676] text-black text-xs font-bold rounded-lg transition-colors shadow-[0_0_10px_rgba(32,255,130,0.2)]">
                                    Aprovar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const UsersManagementTab = () => {
    const [users] = useState([
        { id: 1, name: 'Ricardo Mendes', email: 'ricardo@email.com', role: 'Cliente', status: 'active', plan: 'Free' },
        { id: 2, name: 'Ana Clara Elétrica', email: 'ana@electric.com', role: 'Prestador', status: 'verified', plan: 'Pro' },
        { id: 3, name: 'Carlos J. Encanador', email: 'carlos@encanador.com', role: 'Prestador', status: 'pending', plan: 'Starter' },
        { id: 4, name: 'Spammer Bot', email: 'bot@spam.com', role: 'Cliente', status: 'banned', plan: 'Free' },
    ]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex gap-4 bg-[#111] p-2 rounded-xl border border-gray-800 max-w-md">
                <SearchIcon className="w-5 h-5 text-gray-500 ml-2 mt-2.5"/>
                <input 
                    placeholder="Buscar por nome, email ou ID..." 
                    className="bg-transparent border-none focus:ring-0 text-white w-full outline-none text-sm"
                />
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black/50 border-b border-gray-800 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                            <th className="p-4">Usuário</th>
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Plano</th>
                            <th className="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <p className="font-bold text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </td>
                                <td className="p-4 text-gray-300">{user.role}</td>
                                <td className="p-4"><StatusBadge status={user.status} /></td>
                                <td className="p-4">
                                    {user.plan === 'Pro' ? (
                                        <span className="text-[#20FF82] font-bold text-xs">PRO</span>
                                    ) : (
                                        <span className="text-gray-500 text-xs">{user.plan}</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                        <CogIcon className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- TEAM MANAGEMENT TAB ---

type StaffRole = 'master' | 'moderator' | 'support' | 'analyst';

interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: StaffRole;
    lastActive: string;
}

const roleConfig = {
    master: { label: 'Admin Master', color: 'text-[#20FF82] bg-[#20FF82]/10 border-[#20FF82]/20', desc: 'Acesso Total' },
    moderator: { label: 'Gerente de Operações', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', desc: 'Moderação, Verificação, Bans' },
    support: { label: 'Suporte', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'Ver Usuários, Disputas' },
    analyst: { label: 'Analista Financeiro', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Apenas Finanças' },
};

const TeamTab = () => {
    const [staff, setStaff] = useState<StaffMember[]>([
        { id: '1', name: 'Administrador Mestre', email: 'admin@localizaqui.com', role: 'master', lastActive: 'Agora' },
        { id: '2', name: 'Carlos Silva', email: 'carlos@localizaqui.com', role: 'moderator', lastActive: '2h atrás' },
        { id: '3', name: 'Juliana Costa', email: 'juliana@localizaqui.com', role: 'support', lastActive: '5min atrás' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', email: '', role: 'support' as StaffRole });

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        const id = Math.random().toString(36).substr(2, 9);
        setStaff([...staff, { ...newMember, id, lastActive: 'Convidado' }]);
        setIsModalOpen(false);
        setNewMember({ name: '', email: '', role: 'support' });
    };

    const handleRemoveMember = (id: string) => {
        if (confirm('Tem certeza que deseja remover este membro da equipe?')) {
            setStaff(staff.filter(m => m.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">Gestão de Equipe</h2>
                    <p className="text-sm text-gray-400">Gerencie quem tem acesso ao painel administrativo.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#20FF82] hover:bg-[#1ce676] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    Adicionar Membro
                </button>
            </div>

            <div className="grid gap-4">
                {staff.map(member => (
                    <div key={member.id} className="bg-[#111] border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white border border-gray-700">
                                {member.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    {member.name}
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold", roleConfig[member.role].color)}>
                                        {roleConfig[member.role].label}
                                    </span>
                                </h3>
                                <p className="text-xs text-gray-500">{member.email} • Último acesso: {member.lastActive}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-gray-600 hidden sm:block">{roleConfig[member.role].desc}</p>
                            {member.role !== 'master' && (
                                <button onClick={() => handleRemoveMember(member.id)} className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Invite Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#111] border border-gray-800 rounded-2xl p-6 w-full max-w-md"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Convidar Novo Membro</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><XIcon className="w-5 h-5" /></button>
                            </div>
                            
                            <form onSubmit={handleAddMember} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome</label>
                                    <input 
                                        required
                                        value={newMember.name}
                                        onChange={e => setNewMember({...newMember, name: e.target.value})}
                                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:border-[#20FF82] outline-none"
                                        placeholder="Ex: Maria Silva"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Corporativo</label>
                                    <input 
                                        required
                                        type="email"
                                        value={newMember.email}
                                        onChange={e => setNewMember({...newMember, email: e.target.value})}
                                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:border-[#20FF82] outline-none"
                                        placeholder="maria@localizaqui.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Função (Cargo)</label>
                                    <select 
                                        value={newMember.role}
                                        onChange={e => setNewMember({...newMember, role: e.target.value as StaffRole})}
                                        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:border-[#20FF82] outline-none"
                                    >
                                        <option value="moderator">Gerente de Operações (Moderador)</option>
                                        <option value="support">Suporte (Atendimento)</option>
                                        <option value="analyst">Analista Financeiro</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2 bg-gray-900 p-2 rounded">
                                        {roleConfig[newMember.role].desc}
                                    </p>
                                </div>
                                
                                <button type="submit" className="w-full bg-[#20FF82] text-black font-bold py-3 rounded-lg hover:bg-[#1ce676] transition-colors mt-2">
                                    Enviar Convite
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const VouchersTab = () => {
    const [vouchers, setVouchers] = useState<string[]>([]);
    const [newVoucher, setNewVoucher] = useState('');

    useEffect(() => {
        const storedVouchers = localStorage.getItem('localizaqui_vouchers');
        if (storedVouchers) {
            setVouchers(JSON.parse(storedVouchers));
        } else {
            const defaults = ['PRO30', 'LOCALIZA_VIP', 'BETA_TESTER'];
            setVouchers(defaults);
            localStorage.setItem('localizaqui_vouchers', JSON.stringify(defaults));
        }
    }, []);

    const saveVouchers = (updatedVouchers: string[]) => {
        setVouchers(updatedVouchers);
        localStorage.setItem('localizaqui_vouchers', JSON.stringify(updatedVouchers));
    };

    const handleAddVoucher = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVoucher.trim()) return;
        const code = newVoucher.toUpperCase().trim();
        if (!vouchers.includes(code)) {
            saveVouchers([...vouchers, code]);
            setNewVoucher('');
        }
    };

    const handleDeleteVoucher = (code: string) => {
        saveVouchers(vouchers.filter(v => v !== code));
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            <div className="space-y-6">
                <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                    <h3 className="text-lg font-bold text-white mb-4">Criar Cupom</h3>
                    <form onSubmit={handleAddVoucher} className="flex gap-2">
                        <input 
                            value={newVoucher}
                            onChange={(e) => setNewVoucher(e.target.value)}
                            placeholder="CÓDIGO (Ex: BLACKFRIDAY)"
                            className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-2 text-white uppercase focus:border-[#20FF82] outline-none"
                        />
                        <button type="submit" className="bg-[#20FF82] hover:bg-[#1ce676] text-black p-3 rounded-xl transition-colors">
                            <PlusCircleIcon className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-3">
                        Este cupom concede <strong>1 mês de Plano Pro Grátis</strong>. Útil para marketing e parceiros.
                    </p>
                </div>
            </div>

            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">Cupons Ativos</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {vouchers.length === 0 ? <p className="text-gray-600 text-sm">Nenhum cupom ativo.</p> : vouchers.map(code => (
                        <div key={code} className="flex justify-between items-center p-3 bg-[#0a0a0a] rounded-lg border border-gray-800 group hover:border-gray-700">
                            <code className="text-[#20FF82] font-mono font-bold">{code}</code>
                            <button onClick={() => handleDeleteVoucher(code)} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN LAYOUT ---

const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');

    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: <ChartBarIcon className="w-5 h-5"/> },
        { id: 'verification', label: 'Verificações', icon: <DocumentTextIcon className="w-5 h-5"/>, badge: 3 },
        { id: 'users', label: 'Gestão Usuários', icon: <UsersIcon className="w-5 h-5"/> },
        { id: 'team', label: 'Equipe', icon: <UserGroupIcon className="w-5 h-5"/> },
        { id: 'finance', label: 'Assinaturas', icon: <BanknotesIcon className="w-5 h-5"/> },
        { id: 'vouchers', label: 'Cupons', icon: <TicketIcon className="w-5 h-5"/> },
        { id: 'settings', label: 'Configurações', icon: <CogIcon className="w-5 h-5"/> },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-gray-800 flex-shrink-0 flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                        <SparklesIcon className="w-6 h-6 text-[#20FF82]" />
                        <span>localiz<span className="text-[#20FF82]">admin</span></span>
                    </div>
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as AdminTab)}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                activeTab === tab.id 
                                    ? "bg-[#20FF82]/10 text-[#20FF82] border border-[#20FF82]/20" 
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {tab.icon}
                                {tab.label}
                            </div>
                            {tab.badge && (
                                <span className="bg-[#20FF82] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={() => onNavigate('landing')} className="w-full flex items-center gap-2 text-gray-500 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Voltar ao Site
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md z-10">
                    <h1 className="text-lg font-bold text-white">{tabs.find(t => t.id === activeTab)?.label}</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-900/20 border border-red-500/20 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Admin Mode</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-white border border-gray-700">
                            AD
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-black relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed"></div>
                    <div className="max-w-6xl mx-auto relative z-10">
                        {activeTab === 'overview' && <OverviewTab />}
                        {activeTab === 'verification' && <VerificationQueueTab />}
                        {activeTab === 'users' && <UsersManagementTab />}
                        {activeTab === 'team' && <TeamTab />}
                        {activeTab === 'finance' && (
                            <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#111]">
                                <BanknotesIcon className="w-12 h-12 text-gray-700 mx-auto mb-4"/>
                                <h3 className="text-xl font-bold text-gray-300">Módulo Financeiro</h3>
                                <p className="text-gray-500">Integração com Gateway de Pagamento em desenvolvimento.</p>
                            </div>
                        )}
                        {activeTab === 'vouchers' && <VouchersTab />}
                        {activeTab === 'settings' && (
                             <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 max-w-2xl">
                                <h3 className="text-xl font-bold text-white mb-6">Configurações Globais</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-white">Modo Manutenção</p>
                                            <p className="text-xs text-gray-500">Desativa o acesso público à plataforma</p>
                                        </div>
                                        <div className="w-12 h-6 bg-gray-800 rounded-full p-1 cursor-pointer"><div className="w-4 h-4 bg-gray-500 rounded-full"></div></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-white">Aprovação Automática</p>
                                            <p className="text-xs text-gray-500">Permitir novos usuários sem verificação manual</p>
                                        </div>
                                        <div className="w-12 h-6 bg-[#20FF82] rounded-full p-1 cursor-pointer flex justify-end"><div className="w-4 h-4 bg-white rounded-full shadow-md"></div></div>
                                    </div>
                                </div>
                             </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
