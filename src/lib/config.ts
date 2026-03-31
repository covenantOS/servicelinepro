import fs from 'node:fs';
import YAML from 'yaml';
import path from 'node:path';

const configPath = path.resolve('./site.config.yaml');
const raw = fs.readFileSync(configPath, 'utf8');
const config = YAML.parse(raw);

export interface PricingTier {
  name: string;
  price: number;
  price_label?: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface ServicePricing {
  setup_fee?: number;
  quote_based?: boolean;
  description?: string;
  tiers?: PricingTier[];
}

export interface SubService {
  slug: string;
  name: string;
  short_description?: string;
}

export interface Service {
  slug: string;
  name: string;
  short_description: string;
  image: string;
  icon?: string;
  pricing?: ServicePricing;
  sub_services?: SubService[];
}

export interface Industry {
  slug: string;
  name: string;
  full_name: string;
  description: string;
}

export interface Area {
  slug: string;
  name: string;
  is_primary?: boolean;
}

export interface Review {
  author: string;
  company?: string;
  text: string;
  rating: number;
  date: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  result: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface SiteConfig {
  business: {
    name: string;
    legal_name: string;
    owner: string;
    phone: string;
    phone_raw: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      state_full: string;
      zip: string;
    };
    hours: string;
    tagline: string;
    description: string;
    google_maps_url: string;
    founded_year: number;
    geo?: {
      latitude: number;
      longitude: number;
    };
    hours_schema?: string;
    team?: TeamMember[];
  };
  brand: {
    theme: string;
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
      dark: string;
      light: string;
      white: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    logo: string;
  };
  trust_signals: {
    rating: string;
    review_count: number;
    review_platform: string;
    badges: string[];
  };
  services: Service[];
  industries: Industry[];
  areas: Area[];
  area_service_combos: string[];
  reviews: Review[];
  case_studies: CaseStudy[];
  form: {
    action: string;
  };
  seo: {
    domain: string;
    title_suffix: string;
  };
  built_by: {
    name: string;
    url: string;
  };
  spectrum_partnership?: {
    name: string;
    parent: string;
    households: string;
    states: number;
    certifications: string[];
  };
}

export default config as SiteConfig;
