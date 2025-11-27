import React from 'react';
import { Demand, Page } from '../types';
import { DemandCard } from '../components/demand/DemandCard';
import { PlusCircleIcon } from '../components/icons/PlusCircleIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { ClipboardListIcon } from '../components/icons/ClipboardListIcon';

interface MyDemandsPageProps {
    userDemands: Demand[];
    onNavigate: (page: Page) => void;
    onViewDetails: (demandId: string) => void;
}

const MyDemandsPage: React.FC<MyDemandsPageProps> = ({ userDemands, onNavigate, onViewDetails }) => {
    const openDemands = userDemands.filter(d => d.status === 'aberta' || d.status === 'em_andamento');
    const closedDemands = userDemands.filter(d => d.status === 'concluida' || d.status === 'pausada');
    
    return (
        <div className="flex-1 w-full h-full flex flex-col overflow-y-auto bg-black text-white p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">
                <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-gray-800 pb-8">
                    <div>
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-bold mb-4">
                            <ClipboardListIcon className="w-3 h-3" />
                            <span>MEUS PEDIDOS</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Gerenciar Demandas</h1>
                        <p className="text-gray-400 mt-2 text-lg">Acompanhe o progresso e negocie com profissionais.</p>
                    </div>
                    <button 
                        onClick={() => onNavigate('demand-creation')}
                        className="flex items-center gap-2 bg-[#20FF82] text-black font-bold px-6 py-3.5 rounded-xl hover:bg-[#1ce676] transition-all shadow-[0_0_20px_-5px_rgba(32,255,130,0.3)] transform hover:scale-105"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        <span>Criar Nova Demanda</span>
                    </button>
                </header>

                <main className="flex-1 space-y-16 pb-20">
                    {userDemands.length === 0 ? (
                        <div className="text-center py-32 bg-[#111111]/50 border border-dashed border-gray-800 rounded-3xl flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-purple-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <SparklesIcon className="w-10 h-10 text-purple-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Comece sua jornada</h2>
                            <p className="text-gray-400 mt-2 max-w-md mx-auto">
                                Você ainda não solicitou nenhum serviço. Descreva o que precisa e deixe nossa IA encontrar o profissional ideal.
                            </p>
                            <button 
                                onClick={() => onNavigate('demand-creation')}
                                className="mt-8 text-[#20FF82] font-bold hover:underline"
                            >
                                Publicar meu primeiro pedido &rarr;
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Active Section */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Em Andamento
                                        <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-900 px-2 py-0.5 rounded-md">{openDemands.length}</span>
                                    </h2>
                                </div>
                                
                                {openDemands.length > 0 ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {openDemands.map(demand => (
                                            <DemandCard key={demand.id} demand={demand} onViewDetails={onViewDetails} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 bg-[#111111] rounded-xl border border-gray-800 text-center text-gray-500">
                                        Não há demandas ativas no momento.
                                    </div>
                                )}
                            </section>

                            {/* Closed Section */}
                            {closedDemands.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                                            Histórico
                                            <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-900 px-2 py-0.5 rounded-md">{closedDemands.length}</span>
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 opacity-70 hover:opacity-100 transition-opacity">
                                        {closedDemands.map(demand => (
                                            <DemandCard key={demand.id} demand={demand} onViewDetails={onViewDetails} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MyDemandsPage;