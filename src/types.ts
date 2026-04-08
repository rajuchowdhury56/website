import { LucideIcon } from 'lucide-react';

export interface Post {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  createdAt: any;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutText: string;
  contactEmail: string;
  footerText: string;
  profileName: string;
  profileTitle: string;
  profileImage: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
}
