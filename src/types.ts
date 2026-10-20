export interface HeroSlide {
  id: string;
  tagNumber: string;
  category: string;
  title: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  imageSrc: string;
  imageAlt: string;
  badgeModule: string;
  badgeDetail: string;
}

export interface MetricItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'shield' | 'cloud' | 'server' | 'users' | 'clock' | 'globe';
}

export interface CapabilityCardData {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  imageSrc: string;
  iconName: 'settings' | 'link' | 'cloud' | 'building';
  technicalDetails: {
    overview: string;
    keyDeliverables: string[];
    supportedTech: string[];
    businessValue: string;
  };
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Industrial' | 'Energy & Utilities' | 'Public & Healthcare' | 'Real Estate & Fleet';
  imageSrc: string;
  impactMetric: string;
  caseSummary: string;
  complianceStandards: string[];
}
