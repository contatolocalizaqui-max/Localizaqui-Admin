
import React from 'react';

const PrivacyPage: React.FC = () => {
    const textContent = {
        h2: "text-2xl font-bold text-white mb-4 mt-8",
        h3: "text-xl font-semibold text-gray-200 mb-3 mt-6",
        p: "text-gray-400 leading-relaxed mb-4",
    };

    return (
        <div className="bg-black text-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Política de Privacidade</h1>
                    <p className="text-center text-gray-500 mt-2">Última atualização: 01 de Agosto, 2024</p>
                    
                    <div className="mt-12 prose prose-invert prose-lg max-w-none">
                        <p className={textContent.p}>
                            Bem-vindo à Política de Privacidade do localizaqui. Sua privacidade é de extrema importância para nós. Este documento descreve como coletamos, usamos, processamos e divulgamos suas informações, incluindo informações pessoais, em conjunto com seu acesso e uso da Plataforma localizaqui.
                        </p>

                        <h2 className={textContent.h2}>1. Informações que Coletamos</h2>
                        <h3 className={textContent.h3}>1.1 Informações que Você nos Fornece.</h3>
                        <p className={textContent.p}>
                            Coletamos informações que você compartilha conosco quando usa a Plataforma localizaqui. Isso inclui informações de cadastro de conta, como seu nome, email, número de telefone e senha. Para prestadores de serviço, coletamos informações de perfil detalhadas, como especialidade, descrição de serviços, localização e portfólio.
                        </p>
                        <h3 className={textContent.h3}>1.2 Informações Coletadas Automaticamente.</h3>
                         <p className={textContent.p}>
                            Quando você usa a Plataforma, coletamos automaticamente informações sobre os serviços que você usa e como os usa. Isso inclui dados de log, informações do dispositivo e informações de localização (se você nos der permissão).
                        </p>

                        <h2 className={textContent.h2}>2. Como Usamos as Informações</h2>
                         <p className={textContent.p}>
                            Utilizamos as informações que coletamos para diversos fins, incluindo:
                            <ul>
                                <li className="ml-6 my-2">Fornecer, melhorar e desenvolver a Plataforma.</li>
                                <li className="ml-6 my-2">Personalizar sua experiência, como sugerir profissionais.</li>
                                <li className="ml-6 my-2">Enviar mensagens de serviço, suporte e administrativas.</li>
                                <li className="ml-6 my-2">Manter um ambiente seguro e confiável.</li>
                            </ul>
                        </p>

                         <h2 className={textContent.h2}>3. Compartilhamento e Divulgação</h2>
                         <h3 className={textContent.h3}>3.1 Com o seu Consentimento.</h3>
                         <p className={textContent.p}>
                            Quando você, como usuário, decide entrar em contato com um prestador de serviço, compartilhamos informações limitadas (como seu nome) para facilitar a comunicação. O prestador de serviço terá um perfil público com as informações que ele decidiu compartilhar.
                         </p>
                         <h3 className={textContent.h3}>3.2 Conformidade com a Lei.</h3>
                          <p className={textContent.p}>
                            Podemos divulgar suas informações a tribunais, autoridades policiais ou órgãos governamentais, se formos obrigados ou autorizados por lei a fazê-lo.
                         </p>

                         <h2 className={textContent.h2}>4. Seus Direitos</h2>
                          <p className={textContent.p}>
                            Você pode exercer qualquer um dos direitos descritos nesta seção entrando em contato conosco. Você tem o direito de acessar e atualizar algumas de suas informações através das configurações de sua Conta.
                          </p>
                          
                         <h2 className={textContent.h2}>5. Alterações a esta Política de Privacidade</h2>
                           <p className={textContent.p}>
                            O localizaqui reserva-se o direito de modificar esta Política de Privacidade a qualquer momento. Se fizermos alterações, publicaremos a política revisada na Plataforma e atualizaremos a data da "Última atualização".
                           </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
