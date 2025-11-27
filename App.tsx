
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ChatInput } from './components/chat/ChatInput';
import { ChatMessage } from './components/chat/ChatMessage';
import { InitialSuggestions } from './components/chat/InitialSuggestions';
import { getAIResponse } from './services/geminiService';
import { Message, User, Page, ProfileData, Demand, Proposal, Plan } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createBlob, decode, decodeAudioData } from './utils/audio';
import { fileToGenerativePart } from './utils/image';
import { LiveAudioIndicator } from './components/chat/LiveAudioIndicator';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProviderRegisterPage from './pages/ProviderRegisterPage';
import LandingPage from './pages/LandingPage';
import PublicLayout from './components/layout/PublicLayout';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';
import PublishSuccessModal from './components/profile/PublishSuccessModal';
import SubscriptionRequiredModal from './components/profile/SubscriptionRequiredModal';
import { Toast } from './components/common/Toast';
import InYourRegionPage from './pages/InYourRegionPage';
import { TypingIndicator } from './components/chat/TypingIndicator';
import SavedContactsPage from './pages/SavedContactsPage';
import ChatWelcomeModal from './components/chat/ChatWelcomeModal';
import { mockProfiles } from './data/mockProfiles';
import PublicProfilePage from './pages/PublicProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DemandCreationPage from './pages/DemandCreationPage';
import MyDemandsPage from './pages/MyDemandsPage';
import { mockDemands } from './data/mockDemands';
import DemandDetailsPage from './pages/DemandDetailsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import ProposalFormModal from './components/proposal/ProposalFormModal';
import MyDemandsWelcomeModal from './components/demand/MyDemandsWelcomeModal';
import OpportunitiesWelcomeModal from './components/demand/OpportunitiesWelcomeModal';
import DemandDetailsWelcomeModal from './components/demand/DemandDetailsWelcomeModal';
import NotFoundPage from './pages/NotFoundPage';
import RealTimeSearchPage from './pages/RealTimeSearchPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AdminPage from './pages/AdminPage';


export type AiMode = 'fast' | 'standard' | 'complex';

// --- CUSTOM HOOKS (defined in the same file to avoid new files) ---
const useChat = (initialName: string, aiMode: AiMode, location: { latitude: number, longitude: number } | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUserTyping, setIsUserTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const initializeChat = useCallback((name: string) => {
        // Removed initial text message to show the "Dashboard Zero" first
        setMessages([]); 
    }, []);
    
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, isUserTyping]);

    const handleSendMessage = useCallback(async (text: string, image?: File) => {
        if (!text.trim() && !image) return;

        let imagePart;
        let userMessageImageUrl;

        if (image) {
            try {
                imagePart = await fileToGenerativePart(image);
                userMessageImageUrl = URL.createObjectURL(image);
            } catch (error) {
                console.error('Error processing image:', error);
                return;
            }
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            imageUrl: userMessageImageUrl,
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const history = messages;
            const subscribers = mockProfiles.filter(p => p.isSubscriber);
            const aiResponse = await getAIResponse(text, history, aiMode, imagePart, location ?? undefined, subscribers);
            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error getting AI response:', error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: 'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.',
                sender: 'ai',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, aiMode, location]);

    const handleSuggestionClick = (suggestion: string) => {
        handleSendMessage(suggestion);
    };
    
    return {
        messages,
        setMessages,
        isLoading,
        isUserTyping,
        setIsUserTyping,
        handleSendMessage,
        handleSuggestionClick,
        chatEndRef,
        initializeChat,
    };
};

const useLiveConversation = (setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    const [isLive, setIsLive] = useState(false);
    const [transcription, setTranscription] = useState<{ userInput: string, modelInput: string }>({ userInput: '', modelInput: '' });
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const currentTranscriptionRef = useRef({ userInput: '', modelInput: '' });

    const stopLiveConversation = useCallback(async () => {
        setIsLive(false);
        setTranscription({ userInput: '', modelInput: '' });
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
        audioWorkletNodeRef.current?.disconnect();
        audioWorkletNodeRef.current = null;
        mediaStreamSourceRef.current?.disconnect();
        mediaStreamSourceRef.current = null;
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            await audioContextRef.current.close();
        }
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            await outputAudioContextRef.current.close();
        }
        audioSourcesRef.current.forEach(source => source.stop());
        audioSourcesRef.current.clear();
        nextStartTimeRef.current = 0;
        if (sessionPromiseRef.current) {
            const session = await sessionPromiseRef.current;
            session.close();
            sessionPromiseRef.current = null;
        }
    }, []);

    const startLiveConversation = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            setIsLive(true);

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            audioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

            const workletCode = `
                class AudioProcessor extends AudioWorkletProcessor {
                  process(inputs, outputs, parameters) {
                    const input = inputs[0];
                    if (input.length > 0) {
                      this.port.postMessage(input[0]);
                    }
                    return true;
                  }
                }
                registerProcessor('audio-processor', AudioProcessor);
            `;
            const blob = new Blob([workletCode], { type: 'application/javascript' });
            const workletURL = URL.createObjectURL(blob);
            await audioContextRef.current.audioWorklet.addModule(workletURL);
            audioWorkletNodeRef.current = new AudioWorkletNode(audioContextRef.current, 'audio-processor');

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    inputAudioTranscription: {},
                    outputAudioTranscription: {}
                },
                callbacks: {
                    onopen: () => {
                        mediaStreamSourceRef.current = audioContextRef.current!.createMediaStreamSource(stream);
                        mediaStreamSourceRef.current.connect(audioWorkletNodeRef.current!);
                        
                        audioWorkletNodeRef.current!.port.onmessage = (event) => {
                            const pcmBlob = createBlob(event.data);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            currentTranscriptionRef.current.userInput += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            currentTranscriptionRef.current.modelInput += message.serverContent.outputTranscription.text;
                        }
                        setTranscription({ ...currentTranscriptionRef.current });

                        if (message.serverContent?.turnComplete) {
                            const fullInputTranscription = currentTranscriptionRef.current.userInput;
                            const fullOutputTranscription = currentTranscriptionRef.current.modelInput;

                            if (fullInputTranscription.trim() || fullOutputTranscription.trim()) {
                                setMessages(prev => {
                                    const newMessages: Message[] = [];
                                    if (fullInputTranscription.trim()) {
                                        newMessages.push({ id: Date.now().toString() + '-user', sender: 'user', text: fullInputTranscription });
                                    }
                                    if (fullOutputTranscription.trim()) {
                                        newMessages.push({ id: Date.now().toString() + '-ai', sender: 'ai', text: fullOutputTranscription });
                                    }
                                    return [...prev, ...newMessages];
                                });
                            }
                            currentTranscriptionRef.current = { userInput: '', modelInput: '' };
                            setTranscription({ userInput: '', modelInput: '' });
                        }

                        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if (audioData) {
                            const outputCtx = outputAudioContextRef.current!;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);

                            const audioBuffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
                            const source = outputCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputCtx.destination);

                            source.addEventListener('ended', () => {
                                audioSourcesRef.current.delete(source);
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            audioSourcesRef.current.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live session error:', e);
                        setMessages(prev => [...prev, { id: 'live-error', sender: 'ai', text: 'Ocorreu um erro na conversa. Tente novamente.' }]);
                        stopLiveConversation();
                    },
                    onclose: () => { },
                },
            });
        } catch (error) {
            console.error('Failed to start live conversation:', error);
            setMessages(prev => [...prev, { id: 'mic-error', sender: 'ai', text: 'Não foi possível acessar o microfone. Verifique as permissões.' }]);
            setIsLive(false);
        }
    }, [stopLiveConversation, setMessages]);

    return { isLive, transcription, startLiveConversation, stopLiveConversation };
};


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | '404'>('landing');
  const [previousPage, setPreviousPage] = useState<Page>('app');
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [viewingDemandId, setViewingDemandId] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false); 
  const [userDemands, setUserDemands] = useState<Demand[]>(mockDemands);
  const [proposalModalState, setProposalModalState] = useState<{ isOpen: boolean; demandId: string | null }>({ isOpen: false, demandId: null });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [aiMode, setAiMode] = useState<AiMode>('standard');
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Sidebar Loading State
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [isNewSearchLoading, setIsNewSearchLoading] = useState<boolean>(false);

  // Profile Publishing State
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);
  const [showSubscriptionRequired, setShowSubscriptionRequired] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Welcome Modals State
  const [showChatWelcome, setShowChatWelcome] = useState(false);
  const [showMyDemandsWelcome, setShowMyDemandsWelcome] = useState(false);
  const [showOpportunitiesWelcome, setShowOpportunitiesWelcome] = useState(false);
  const [showDemandDetailsWelcome, setShowDemandDetailsWelcome] = useState(false);


  // Custom Hooks for Chat and Live Conversation
  const {
      messages,
      setMessages,
      isLoading,
      isUserTyping,
      setIsUserTyping,
      handleSendMessage,
      handleSuggestionClick,
      chatEndRef,
      initializeChat,
  } = useChat(user?.name.split(' ')[0] ?? '', aiMode, location);

  const {
      isLive,
      transcription,
      startLiveConversation,
      stopLiveConversation,
  } = useLiveConversation(setMessages);


  useEffect(() => {
    const persistedUserJson = localStorage.getItem('loggedInUser');
    if (persistedUserJson) {
        try {
            const persistedUser = JSON.parse(persistedUserJson);
            setUser(persistedUser);
        } catch (e) {
            console.error("Failed to parse persisted user:", e);
            localStorage.removeItem('loggedInUser');
        }
    }
    setIsUserLoading(false);
  }, []);

  useEffect(() => {
    // When user logs in, switch to app and initialize chat
    if (user && (currentPage === 'landing' || currentPage === 'login' || currentPage === 'register' || currentPage === 'provider-register' || currentPage === 'forgot-password')) {
        setIsUserLoading(true);
        // Simulate loading user data after login
        setTimeout(() => {
            setCurrentPage('app');
            initializeChat(user.name.split(' ')[0]);
            setIsUserLoading(false);
        }, 1000);
    } else if (!user && (currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'provider-register' && currentPage !== 'forgot-password' && currentPage !== 'how-it-works' && currentPage !== 'pricing' && currentPage !== 'checkout' && !['categories', 'about', 'blog', 'careers', 'help', 'contact', 'terms', 'privacy', 'real-time-search', 'admin'].includes(currentPage))) {
      // If user logs out, go back to landing
      setCurrentPage('landing');
    }
  }, [user, initializeChat, currentPage]);

  useEffect(() => {
    // Get initial location
    handleGetLocation(false);
  }, []);

  useEffect(() => {
    if (toast) {
        const timer = setTimeout(() => {
            setToast(null);
        }, 4000); // Hide after 4 seconds
        return () => clearTimeout(timer);
    }
  }, [toast]);
  
  useEffect(() => {
    if (currentPage === 'app') {
        const hasSeen = localStorage.getItem('hasSeenChatWelcome');
        if (!hasSeen) setShowChatWelcome(true);
    } else if (currentPage === 'my-demands') {
        const hasSeen = localStorage.getItem('hasSeenMyDemandsWelcome');
        if (!hasSeen) setShowMyDemandsWelcome(true);
    } else if (currentPage === 'opportunities') {
        const hasSeen = localStorage.getItem('hasSeenOpportunitiesWelcome');
        if (!hasSeen) setShowOpportunitiesWelcome(true);
    } else if (currentPage === 'demand-details') {
        const hasSeen = localStorage.getItem('hasSeenDemandDetailsWelcome');
        if (!hasSeen) setShowDemandDetailsWelcome(true);
    }
  }, [currentPage]);

  const handleGetLocation = (showMessages: boolean = true) => {
    setIsLocating(true);
    if(showMessages) {
        setMessages(prev => [...prev, { id: 'locating', text: 'Obtendo sua localização...', sender: 'ai' }]);
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            if(showMessages) {
                setMessages(prev => {
                    const newMessages = prev.filter(m => m.id !== 'locating');
                    return [...newMessages, { id: 'located', text: 'Localização atualizada! Agora posso fazer buscas mais precisas.', sender: 'ai' }];
                });
            }
            setIsLocating(false);
        },
        (error: GeolocationPositionError) => {
            console.error(`Geolocation error: ${error.message} (code: ${error.code})`);
            let errorMessageText = 'Não foi possível obter sua localização.';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessageText = 'Permissão de localização negada. Verifique as configurações do seu navegador.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessageText = 'Informação de localização indisponível no momento.';
                    break;
                case error.TIMEOUT:
                    errorMessageText = 'A solicitação de localização demorou muito para responder.';
                    break;
            }

            if(showMessages) {
                setMessages(prev => {
                    const newMessages = prev.filter(m => m.id !== 'locating');
                    return [...newMessages, { id: 'locate-error', text: errorMessageText, sender: 'ai' }];
                });
            }
            setIsLocating(false);
        }
    );
  };
  
  const handleGeolocateForProfile = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use a reverse geocoding API here.
          // For this demo, we'll return a mock city.
          console.log("Geolocated for profile:", position.coords);
          resolve("São Paulo, SP"); 
        },
        (error: GeolocationPositionError) => {
          console.error(`Geolocation error for profile: ${error.message} (code: ${error.code})`);
          let errorMessageText = "Não foi possível obter a localização.";
          switch(error.code) {
              case error.PERMISSION_DENIED:
                  errorMessageText = 'Permissão de localização negada.';
                  break;
              case error.POSITION_UNAVAILABLE:
                  errorMessageText = 'Informação de localização indisponível.';
                  break;
              case error.TIMEOUT:
                  errorMessageText = 'A solicitação de localização expirou.';
                  break;
          }
          reject(errorMessageText);
        }
      );
    });
  };

  const handleNewSearch = async () => {
    setIsNewSearchLoading(true);
    // Simulate an async action
    await new Promise(resolve => setTimeout(resolve, 700));
    setMessages([]); // Clear messages for new dashboard zero
    if (user) {
        // Do not add initial message to show Dashboard Zero
    }
    setCurrentPage('app');
    setIsNewSearchLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setMessages([]);
  }
  
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleSaveOnlyProfile = () => {
    // In a real app, this would save to a backend.
    setToast({ message: "Rascunho do perfil salvo com sucesso!", type: 'success' });
  };

  const handlePublishProfile = () => {
      setIsPublishing(true);
      // Simulate API check for subscription
      setTimeout(() => {
          if (hasSubscription) {
              setShowPublishSuccess(true);
          } else {
              setShowSubscriptionRequired(true);
          }
          setIsPublishing(false);
      }, 1500);
  };

  const handleGoToPlans = () => {
    setShowSubscriptionRequired(false);
    setCurrentPage('pricing');
  }

  const handleSelectPlan = (plan: Plan) => {
      setSelectedPlan(plan);
      setCurrentPage('checkout');
  };
  
  const handleSubscribe = () => {
      setHasSubscription(true);
      setToast({ message: "Assinatura ativada! Você já pode publicar seu perfil.", type: 'success' });
  };
  
  // --- Welcome Modal Handlers ---
  const handleChatWelcomeClose = (dontShowAgain: boolean) => {
      setShowChatWelcome(false);
      if (dontShowAgain) localStorage.setItem('hasSeenChatWelcome', 'true');
  };

  const handleMyDemandsWelcomeClose = (dontShowAgain: boolean) => {
      setShowMyDemandsWelcome(false);
      if (dontShowAgain) localStorage.setItem('hasSeenMyDemandsWelcome', 'true');
  };

  const handleOpportunitiesWelcomeClose = (dontShowAgain: boolean) => {
      setShowOpportunitiesWelcome(false);
      if (dontShowAgain) localStorage.setItem('hasSeenOpportunitiesWelcome', 'true');
  };

  const handleDemandDetailsWelcomeClose = (dontShowAgain: boolean) => {
      setShowDemandDetailsWelcome(false);
      if (dontShowAgain) localStorage.setItem('hasSeenDemandDetailsWelcome', 'true');
  };

  const handleViewProfile = (profileId: string) => {
    setPreviousPage(currentPage as Page);
    setViewingProfileId(profileId);
    setCurrentPage('public-profile');
  };

  const handleBackFromProfile = () => {
    setViewingProfileId(null);
    setCurrentPage(previousPage);
  };

  const handleViewDemandDetails = (demandId: string) => {
    setPreviousPage(currentPage as Page);
    setViewingDemandId(demandId);
    setCurrentPage('demand-details');
  };

  const handleBackFromDemandDetails = () => {
    setViewingDemandId(null);
    setCurrentPage(previousPage);
  }

  const handleOpenProposalModal = (demandId: string) => {
    setProposalModalState({ isOpen: true, demandId: demandId });
  }

  const handleSendProposal = (proposalData: Omit<Proposal, 'id' | 'demandId' | 'providerId' | 'providerProfile' | 'status' | 'createdAt'>) => {
    const demandId = proposalModalState.demandId;
    if (!demandId) return;

    // Mock: The logged-in user is a provider (e.g., provider-2)
    const providerProfile = mockProfiles.find(p => p.id === 'provider-2');
    if (!providerProfile) {
        console.error("Mock provider profile not found!");
        setToast({ message: "Erro: Perfil do prestador não encontrado.", type: 'error' });
        return;
    }

    const newProposal: Proposal = {
        ...proposalData,
        id: `prop-${Date.now()}`,
        demandId: demandId,
        providerId: providerProfile.id,
        providerProfile: providerProfile,
        status: 'sent',
        createdAt: 'Agora mesmo',
    };

    setUserDemands(prevDemands => {
        return prevDemands.map(demand => {
            if (demand.id === demandId) {
                return {
                    ...demand,
                    proposals: [...demand.proposals, newProposal]
                };
            }
            return demand;
        });
    });

    setProposalModalState({ isOpen: false, demandId: null });
    setToast({ message: "Proposta enviada com sucesso!", type: 'success' });
  };
  
  const handleDemandCreated = (newDemand: Omit<Demand, 'id' | 'createdAt' | 'proposals' | 'status'>) => {
    const demandToAdd: Demand = {
      ...newDemand,
      id: `demand-${Date.now()}`,
      createdAt: 'Agora mesmo',
      proposals: [],
      status: 'aberta',
    };
    setUserDemands(prev => [demandToAdd, ...prev]);
    setToast({ message: "Sua demanda foi criada com sucesso!", type: 'success' });
    setCurrentPage('my-demands');
  };

  const handleAcceptProposal = (demandId: string, proposalId: string) => {
    setUserDemands(prevDemands => 
        prevDemands.map(demand => {
            if (demand.id !== demandId) {
                return demand;
            }

            const updatedProposals = demand.proposals.map(proposal => {
                if (proposal.id === proposalId) {
                    return { ...proposal, status: 'accepted' as const };
                }
                if (proposal.status === 'sent' || proposal.status === 'viewed') {
                    return { ...proposal, status: 'rejected' as const };
                }
                return proposal;
            });

            return { 
                ...demand, 
                proposals: updatedProposals, 
                status: 'em_andamento' as const 
            };
        })
    );
    setToast({ message: "Proposta aceita! O contato via WhatsApp foi liberado.", type: 'success' });
  };

  const handleRejectProposal = (demandId: string, proposalId: string) => {
    setUserDemands(prevDemands => 
        prevDemands.map(demand => {
            if (demand.id !== demandId) {
                return demand;
            }
            return {
                ...demand,
                proposals: demand.proposals.map(p => 
                    p.id === proposalId ? { ...p, status: 'rejected' as const } : p
                ),
            };
        })
    );
    setToast({ message: "Proposta recusada.", type: 'success' });
  };

  const handleRestoreProposal = (demandId: string, proposalId: string) => {
    setUserDemands(prevDemands =>
        prevDemands.map(demand => {
            if (demand.id !== demandId) {
                return demand;
            }

            const updatedProposals = demand.proposals.map(proposal => {
                // Restore the selected rejected proposal
                if (proposal.id === proposalId) {
                    return { ...proposal, status: 'sent' as const };
                }
                // Also revert any currently accepted proposal
                if (proposal.status === 'accepted') {
                    return { ...proposal, status: 'sent' as const };
                }
                // Leave other proposals as they are
                return proposal;
            });

            return {
                ...demand,
                proposals: updatedProposals,
                status: 'aberta' as const // Revert demand status to open
            };
        })
    );
    setToast({ message: "Proposta recuperada! Você pode avaliá-la novamente.", type: 'success' });
};


  const renderCurrentPage = () => {
    if (currentPage === 'public-profile') {
        const profile = mockProfiles.find(p => p.id === viewingProfileId);
        if (profile) {
            return <PublicProfilePage profile={profile} onBack={handleBackFromProfile} />;
        }
        // Fallback if profile not found
        handleBackFromProfile();
        return null;
    }
    
    if (currentPage === 'demand-details') {
        const demand = userDemands.find(d => d.id === viewingDemandId);
        if (demand) {
            return <DemandDetailsPage demand={demand} onBack={handleBackFromDemandDetails} onViewProfile={handleViewProfile} onAcceptProposal={handleAcceptProposal} onRejectProposal={handleRejectProposal} onRestoreProposal={handleRestoreProposal} />;
        }
        // Fallback if demand not found
        handleBackFromDemandDetails();
        return null;
    }

    // Pages that require user to be logged in and generally show Sidebar
    const loggedInPages: Page[] = ['app', 'settings', 'in-your-region', 'saved-contacts', 'demand-creation', 'my-demands', 'opportunities', 'admin'];
    
    if (loggedInPages.includes(currentPage as Page)) {
      if (user) {
         // Admin route protection
         if (currentPage === 'admin' && !user.isAdmin) {
             return <NotFoundPage onNavigate={handleNavigate} />;
         }

         return (
                <div className="bg-black text-gray-200 h-screen w-screen flex flex-col md:flex-row antialiased">
                    <Sidebar 
                        handleNewSearch={handleNewSearch} 
                        handleLogout={handleLogout} 
                        user={user}
                        isUserLoading={isUserLoading}
                        isNewSearchLoading={isNewSearchLoading}
                        handleNavigate={handleNavigate}
                    />
                    {currentPage === 'settings' ? (
                        <SettingsPage 
                          onSaveOnly={handleSaveOnlyProfile} 
                          onPublish={handlePublishProfile} 
                          isPublishing={isPublishing}
                          onGeolocate={handleGeolocateForProfile} 
                        />
                    ) : currentPage === 'in-your-region' ? (
                        <InYourRegionPage onViewProfile={handleViewProfile} />
                    ) : currentPage === 'saved-contacts' ? (
                        <SavedContactsPage onViewProfile={handleViewProfile} />
                    ) : currentPage === 'demand-creation' ? (
                        <DemandCreationPage onDemandCreated={handleDemandCreated} onGeolocate={handleGeolocateForProfile} />
                    ) : currentPage === 'my-demands' ? (
                        <MyDemandsPage userDemands={userDemands} onNavigate={handleNavigate} onViewDetails={handleViewDemandDetails} />
                    ) : currentPage === 'opportunities' ? (
                        <OpportunitiesPage demands={userDemands.filter(d => d.status === 'aberta')} onSendProposal={handleOpenProposalModal} />
                    ) : currentPage === 'admin' ? (
                        <AdminPage onNavigate={handleNavigate} />
                    ) : (
                        <div className="flex-1 flex flex-col h-full relative overflow-y-hidden">
                            <Header 
                                currentMode={aiMode}
                                setMode={setAiMode}
                                user={user}
                            />
                            {isLive && <LiveAudioIndicator transcription={transcription} />}
                            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                                <div className="max-w-3xl mx-auto min-h-full flex flex-col">
                                    <div className="flex-1">
                                        {messages.length === 0 ? (
                                            <InitialSuggestions onSuggestionClick={handleSuggestionClick} user={user} />
                                        ) : messages.map((msg) => (
                                            <ChatMessage key={msg.id} message={msg} onSuggestionClick={handleSuggestionClick} onViewProfile={handleViewProfile} />
                                        ))}
                                        {isLoading && <TypingIndicator sender="ai" />}
                                        {isUserTyping && !isLoading && <TypingIndicator sender="user" />}
                                        
                                        {/* Spacer to prevents content from being hidden behind the fixed input */}
                                        <div className="h-32 md:h-48" aria-hidden="true" />
                                        <div ref={chatEndRef} />
                                    </div>
                                    
                                    <ChatInput 
                                        onSendMessage={handleSendMessage} 
                                        isLoading={isLoading || isLive || isLocating}
                                        isLive={isLive}
                                        toggleLive={isLive ? stopLiveConversation : startLiveConversation}
                                        onLocate={handleGetLocation}
                                        isLocating={isLocating}
                                        onTypingChange={setIsUserTyping}
                                    />
                                </div>
                            </main>
                        </div>
                    )}
                </div>
            );
        } else {
            // If somehow we are at 'app' without a user, redirect to login
            setCurrentPage('login');
            return null;
        }
    }

    // Handle Public and Auth pages
    let pageComponent;
    switch (currentPage) {
        case 'landing':
            pageComponent = <LandingPage onNavigateToRegister={() => handleNavigate('register')} />;
            break;
        case 'how-it-works':
            pageComponent = <HowItWorksPage />;
            break;
        case 'pricing':
            pageComponent = <PricingPage onSubscribe={handleSelectPlan} />;
            break;
        case 'categories':
            pageComponent = <CategoriesPage onNavigate={handleNavigate} />;
            break;
        case 'about':
            pageComponent = <AboutPage onNavigate={handleNavigate} />;
            break;
        case 'blog':
            pageComponent = <BlogPage onNavigate={handleNavigate} />;
            break;
        case 'careers':
            pageComponent = <CareersPage />;
            break;
        case 'help':
            pageComponent = <HelpCenterPage />;
            break;
        case 'contact':
            pageComponent = <ContactPage />;
            break;
        case 'terms':
            pageComponent = <TermsPage />;
            break;
        case 'privacy':
            pageComponent = <PrivacyPage />;
            break;
        case 'login':
            pageComponent = <LoginPage onLoginSuccess={setUser} onNavigateToRegister={() => handleNavigate('register')} onNavigateToForgotPassword={() => handleNavigate('forgot-password')} />;
            break;
        case 'register':
            pageComponent = <RegisterPage onRegisterSuccess={setUser} onNavigateToLogin={() => handleNavigate('login')} onNavigateToProviderRegister={() => handleNavigate('provider-register')} onNavigate={handleNavigate} />;
            break;
        case 'provider-register':
             pageComponent = <ProviderRegisterPage onRegisterSuccess={setUser} onNavigateToLogin={() => handleNavigate('login')} />;
             break;
        case 'forgot-password':
             pageComponent = <ForgotPasswordPage onNavigateToLogin={() => handleNavigate('login')} />;
             break;
        case 'real-time-search':
             pageComponent = <RealTimeSearchPage />;
             break;
        case 'checkout':
             pageComponent = <CheckoutPage plan={selectedPlan} user={user} onNavigate={handleNavigate} />;
             break;
        case 'payment-success':
             pageComponent = <PaymentSuccessPage onNavigate={handleNavigate} />;
             break;
        case '404':
             pageComponent = <NotFoundPage onNavigate={handleNavigate} />;
             break;
        default:
            pageComponent = <NotFoundPage onNavigate={handleNavigate} />;
    }

    const pagesWithAuthLayout = ['register', 'provider-register', 'forgot-password'];
    if (pagesWithAuthLayout.includes(currentPage)) {
        return pageComponent;
    }

    return (
        <PublicLayout onNavigate={handleNavigate} user={user}>
            {pageComponent}
        </PublicLayout>
    );
  }

  return (
    <>
      <Toast isVisible={!!toast} message={toast?.message} type={toast?.type} />
      {renderCurrentPage()}
      <PublishSuccessModal 
        isOpen={showPublishSuccess} 
        onClose={() => {
            setShowPublishSuccess(false);
            setCurrentPage('app');
        }} 
      />
      <SubscriptionRequiredModal 
        isOpen={showSubscriptionRequired}
        onClose={() => setShowSubscriptionRequired(false)}
        onGoToPlans={handleGoToPlans}
      />
      <ChatWelcomeModal 
        isOpen={showChatWelcome} 
        onClose={handleChatWelcomeClose}
      />
      <ProposalFormModal 
        isOpen={proposalModalState.isOpen}
        onClose={() => setProposalModalState({ isOpen: false, demandId: null })}
        onSubmit={handleSendProposal}
        demand={userDemands.find(d => d.id === proposalModalState.demandId)}
      />
      <MyDemandsWelcomeModal 
        isOpen={showMyDemandsWelcome}
        onClose={handleMyDemandsWelcomeClose}
      />
      <OpportunitiesWelcomeModal
        isOpen={showOpportunitiesWelcome}
        onClose={handleOpportunitiesWelcomeClose}
      />
      <DemandDetailsWelcomeModal
        isOpen={showDemandDetailsWelcome}
        onClose={handleDemandDetailsWelcomeClose}
      />
    </>
  );
};

export default App;