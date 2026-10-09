export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  flagship: {
    name: string;
    tagline: string;
    path: string;
  };
  links: {
    twitter: string;
    github: string;
  };
}

export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  isFlagship?: boolean;
}

export type ToolCategory = 'thumbnail' | 'title' | 'money-growth' | 'publishing' | 'shorts';

export type ToolStatus = 'planned' | 'preview' | 'available';

export interface ToolDefinition {
  id: string;
  title: string;
  slug: string;
  href: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  badge?: 'Popular' | 'New' | 'Free';
  status: ToolStatus;
  seoTarget: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
