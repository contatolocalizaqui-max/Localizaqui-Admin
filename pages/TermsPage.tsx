
import React from 'react';

const TermsPage: React.FC = () => {
    const textContent = {
        h2: "text-2xl font-bold text-white mb-4 mt-8",
        h3: "text-xl font-semibold text-gray-200 mb-3 mt-6",
        p: "text-gray-400 leading-relaxed mb-4",
        li: "ml-6 my-2",
    };

    return (
        <div className="bg-black text-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Termos de Serviço</h1>
                    <p className="text-center text-gray-500 mt-2">Última atualização: 01 de Agosto, 2024</p>

                    <div className="mt-12 prose prose-invert prose-lg max-w-none">
                        <p className={textContent.p}>
                            Estes Termos de Serviço ("Termos") regem seu acesso e uso da plataforma localizaqui ("Plataforma"), incluindo quaisquer conteúdos, funcionalidades e serviços oferecidos. Por favor, leia os Termos com atenção antes de começar a usar a Plataforma.
                        </p>

                        <h2 className={textContent.h2}>1. Aceitação dos Termos</h2>
                        <p className={textContent.p}>
                            Ao usar a Plataforma, você aceita e concorda em ficar vinculado e cumprir estes Termos e nossa Política de Privacidade. Se você não concordar com estes Termos ou com a Política de Privacidade, não deve acessar ou usar a Plataforma.
                        </p>

                        <h2 className={textContent.h2}>2. Descrição do Serviço</h2>
                        <p className={textContent.p}>
                            localizaqui é uma plataforma de tecnologia que conecta usuários que buscam serviços ("Usuários") com prestadores de serviços independentes ("Prestadores"). O localizaqui não presta diretamente os serviços oferecidos pelos Prestadores. Somos um intermediário neutro.
                        </p>

                        <h2 className={textContent.h2}>3. Contas de Usuário</h2>
                        <p className={textContent.p}>
                            Para acessar a maioria dos recursos, você deve se registrar e manter uma conta de usuário ativa. Você é responsável por toda a atividade que ocorre em sua Conta e concorda em manter a segurança e o sigilo do seu nome de usuário e senha em todos os momentos.
                        </p>

                        <h2 className={textContent.h2}>4. Conduta do Usuário</h2>
                        <p className={textContent.p}>
                            Você concorda em não usar a Plataforma para:
                            <ul>
                                <li className={textContent.li}>Publicar qualquer conteúdo ilegal, fraudulento, difamatório ou prejudicial.</li>
                                <li className={textContent.li}>Assumir a identidade de outra pessoa ou entidade.</li>
                                <li className={textContent.li}>Interferir ou interromper a integridade ou o desempenho da Plataforma.</li>
                            </ul>
                        </p>
                        
                        <h2 className={textContent.h2}>5. Isenção de Garantia</h2>
                        <p className={textContent.p}>
                            O uso da plataforma é por sua conta e risco. Os serviços são fornecidos "COMO ESTÃO" e "CONFORME DISPONÍVEIS". localizaqui se isenta de todas as garantias, expressas ou implícitas, de comercialização, adequação a um propósito específico e não violação.
                        </p>
                        
                        <h2 className={textContent.h2}>6. Limitação de Responsabilidade</h2>
                         <p className={textContent.p}>
                            Em nenhuma circunstância o localizaqui será responsável por quaisquer danos indiretos, incidentais, especiais, exemplares, punitivos ou consequenciais, incluindo lucros cessantes, perda de dados ou danos materiais relacionados a, em conexão com, ou de outra forma resultantes de qualquer uso da plataforma.
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
