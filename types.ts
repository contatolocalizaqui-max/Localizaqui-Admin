
// FIX: Added and exported KanbanColumnData to be used by Kanban components.
export interface KanbanColumnData {
  id: string;
  title: string;
  contactIds: string[];
}

export interface GroundingInfo {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  suggestions?: string[];
  imageUrl?: string; // For user-uploaded images
  grounding?: GroundingInfo[]; // For AI grounding results
  profiles?: ProfileData[]; // For AI-recommended profiles
  rawAiResponse?: any; // For storing the raw JSON response from the AI
}

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface ServiceProviderProfile {
    fullName: string;
    document: string; // CPF or CNPJ
    email: string;
    phone: string;
    service: string;
    description: string;
    instagram: string;
    linkedin: string;
    password: string;
}

export type Page = 'landing' | 'login' | 'register' | 'provider-register' | 'forgot-password' | 'app' | 'how-it-works' | 'pricing' | 'checkout' | 'payment-success' | 'settings' | 'in-your-region' | 'saved-contacts' | 'public-profile' | 'categories' | 'about' | 'blog' | 'careers' | 'help' | 'contact' | 'terms' | 'privacy' | 'demand-creation' | 'my-demands' | 'demand-details' | 'opportunities' | 'admin';

export type ExperienceLevel = '1-2 anos' | '3-5 anos' | '5-10 anos' | '10+ anos';

export type DayAvailability = {
  enabled: boolean;
  start: string;
  end: string;
};

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProfileData {
  // Step 1
  avatar?: File | null;
  name: string;
  accountType: 'individual' | 'company';
  cpf: string;
  cnpj: string;
  companyName: string;
  email: string;
  phone: string;
  isWhatsapp: boolean;
  
  // Step 2
  serviceCategory: string;
  description: string;
  tags: string[];
  experienceLevel: ExperienceLevel;

  // Step 3
  location: string;
  serviceRadius: number;

  // Step 4
  availabilitySchedule: {
    [key: string]: DayAvailability;
  },
  emergency: boolean;

  // Step 5
  socialLinks: {
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  
  // From original card, kept for compatibility
  id: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  responseTime?: string;
  successRate?: number;
  
  // Not on form, but for display
  availability: string; // This will be formatted from availabilitySchedule
  specialty: string; // This will be the same as serviceCategory
  imageUrl?: string;

  // For "In Your Region" page
  onlineStatus?: 'online' | 'busy' | 'offline';
  isFavorited?: boolean;
  distance?: number; // In km
  lastContact?: string; // For Kanban card
  isSubscriber?: boolean; // For prioritizing in chat

  // For Public Profile Page
  reviews?: Review[];
  galleryImages?: string[];
}


export interface ProfileInsightsData {
    views: number;
    saves: number;
    demand: 'Alta' | 'Média' | 'Baixa';
}

export interface Proposal {
  id: string;
  demandId: string;
  providerId: string;
  providerProfile: ProfileData;
  amount: number;
  message: string;
  estimatedTime: string; // e.g., "2-3 dias úteis"
  status: 'sent' | 'viewed' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Demand {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  urgency: 'imediata' | 'nesta_semana' | 'flexivel';
  budget?: { min?: number; max?: number };
  images?: (File | string)[];
  status: 'aberta' | 'em_andamento' | 'concluida' | 'pausada';
  createdAt: string;
  proposals: Proposal[];
}

export interface Plan {
    name: string;
    price: number;
    cycle: 'monthly' | 'yearly';
    features: string[];
}