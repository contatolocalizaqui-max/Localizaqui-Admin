import { Proposal } from '../types';
import { mockProfiles } from './mockProfiles';

export const mockProposals: Proposal[] = [
    {
        id: 'prop-1',
        demandId: 'demand-1',
        providerId: 'provider-1',
        providerProfile: mockProfiles.find(p => p.id === 'provider-1')!,
        amount: 550,
        message: 'Olá! Sou a Ana Clara, especialista em instalações elétricas. Tenho vasta experiência com ar-condicionado e garanto um serviço limpo e seguro. Posso começar amanhã mesmo.',
        estimatedTime: '1 dia útil',
        status: 'sent',
        createdAt: '1 dia atrás',
    },
    {
        id: 'prop-2',
        demandId: 'demand-1',
        providerId: 'provider-6',
        providerProfile: mockProfiles.find(p => p.id === 'provider-6')!,
        amount: 600,
        message: 'Prezado(a), sou Sérgio, eletricista com certificação. Realizo a instalação completa dos 3 aparelhos com garantia de 1 ano no serviço. Inclui todo o material de fixação.',
        estimatedTime: '1-2 dias úteis',
        status: 'viewed',
        createdAt: '2 dias atrás',
    },
    {
        id: 'prop-3',
        demandId: 'demand-1',
        providerId: 'provider-2', // wrong specialty but for demo
        providerProfile: mockProfiles.find(p => p.id === 'provider-2')!,
        amount: 480,
        message: 'Faço o serviço de forma rápida. Preço mais baixo da região.',
        estimatedTime: '1 dia útil',
        status: 'sent',
        createdAt: '20 horas atrás',
    },
    {
        id: 'prop-4',
        demandId: 'demand-2',
        providerId: 'provider-2',
        providerProfile: mockProfiles.find(p => p.id === 'provider-2')!,
        amount: 150,
        message: 'Atendimento de emergência para vazamentos é minha especialidade. Chego em 30 minutos e resolvo o problema na hora. O valor inclui a troca do sifão se necessário.',
        estimatedTime: '2 horas',
        status: 'accepted',
        createdAt: '4 dias atrás',
    },
];
