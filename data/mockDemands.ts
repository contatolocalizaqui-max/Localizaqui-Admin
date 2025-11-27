import { Demand } from '../types';
import { mockProposals } from './mockProposals';

export const mockDemands: Demand[] = [
    {
        id: 'demand-1',
        title: 'Instalação de 3 ar-condicionados split',
        category: 'Eletricista',
        description: 'Preciso de um profissional qualificado para instalar 3 aparelhos de ar-condicionado em meu apartamento. Os pontos de energia já existem, mas talvez precisem de ajuste. Os aparelhos são de 12.000 BTUs.',
        location: 'São Paulo, SP',
        urgency: 'nesta_semana',
        budget: { min: 400, max: 700 },
        status: 'aberta',
        createdAt: '2 dias atrás',
        proposals: mockProposals.filter(p => p.demandId === 'demand-1'),
        images: ['https://picsum.photos/seed/demand1/200/200']
    },
    {
        id: 'demand-2',
        title: 'Conserto de vazamento na pia da cozinha',
        category: 'Encanador',
        description: 'Há um vazamento constante sob a pia da cozinha, próximo ao sifão. Preciso de um reparo urgente para evitar mais danos ao gabinete.',
        location: 'São Paulo, SP',
        urgency: 'imediata',
        status: 'em_andamento',
        createdAt: '5 dias atrás',
        proposals: mockProposals.filter(p => p.demandId === 'demand-2'),
    },
    {
        id: 'demand-3',
        title: 'Pintura completa de apartamento de 2 quartos',
        category: 'Pintor',
        description: 'Busco orçamento para pintura completa (paredes e teto) de um apartamento de 70m², com 2 quartos, sala, cozinha e banheiro. As paredes estão em bom estado.',
        location: 'São Paulo, SP',
        urgency: 'flexivel',
        budget: { min: 1500, max: 2500 },
        status: 'concluida',
        createdAt: '2 semanas atrás',
        proposals: [],
    }
];