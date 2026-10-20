import { HeroSlide, MetricItem, CapabilityCardData, IndustryItem } from '../types.ts';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'inventory-optimization',
    tagNumber: '01',
    category: 'Smart Supply Chain',
    title: 'Inventory optimization',
    description:
      'Eliminate critical spare-part stockouts and reduce carrying costs with automated reorder points, real-time MRO tracking, and demand forecasting inside IBM Maximo.',
    primaryCtaText: 'Optimize Your Inventory',
    secondaryCtaText: 'View EAM architecture',
    imageSrc: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Automated warehouse inventory optimization and modern logistics',
    badgeModule: 'Maximo Inventory Module',
    badgeDetail: 'Automated MRO Stock & Reorder Telemetry',
  },
  {
    id: 'maintenance-management',
    tagNumber: '02',
    category: 'Intelligent Work Orders',
    title: 'Maintenance management',
    description:
      'Streamline preventive, corrective, and mobile field work orders with automated scheduling, SLA tracking, and real-time technician dispatch across global sites.',
    primaryCtaText: 'Modernize Maintenance',
    secondaryCtaText: 'Explore Maximo Mobile',
    imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Maintenance management and field technician execution',
    badgeModule: 'Maximo Work Order Intelligence',
    badgeDetail: 'Preventive & Field Maintenance Execution',
  },
  {
    id: 'reliability-centered-maintenance',
    tagNumber: '03',
    category: 'Predictive Uptime',
    title: 'Reliability centered maintenance',
    description:
      'Shift from reactive repairs to condition-based monitoring and AI-driven anomaly detection—maximizing equipment availability and eliminating unplanned downtime.',
    primaryCtaText: 'Boost Asset Reliability',
    secondaryCtaText: 'See MAS Monitor & Health',
    imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Reliability centered maintenance telemetry monitoring',
    badgeModule: 'MAS Monitor & Predict',
    badgeDetail: 'Condition-Based Anomaly Detection',
  },
  {
    id: 'asset-lifecycle-planning',
    tagNumber: '04',
    category: 'End-to-End Capital Strategy',
    title: 'Asset lifecycle planning',
    description:
      'Make data-backed repair-vs-replace decisions from procurement and commissioning through retirement, extending asset longevity and optimizing total cost of ownership.',
    primaryCtaText: 'Plan Your Asset Lifecycle',
    secondaryCtaText: 'Explore lifecycle analytics',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Enterprise asset lifecycle planning and capital infrastructure',
    badgeModule: 'Capital Investment & TCO',
    badgeDetail: 'End-to-End Asset Lifecycle Governance',
  },
];

export const METRIC_ITEMS: MetricItem[] = [
  {
    id: 'ibm-partner',
    title: 'Silver Partner',
    subtitle: 'IBM Maximo & TRIRIGA',
    iconName: 'shield',
  },
  {
    id: 'aws-tier',
    title: 'Advanced Tier',
    subtitle: 'AWS Cloud Partnership',
    iconName: 'cloud',
  },
  {
    id: 'redhat',
    title: 'Red Hat',
    subtitle: 'Certified Enterprise Partner',
    iconName: 'server',
  },
  {
    id: 'experts',
    title: '70+ Experts',
    subtitle: 'Certified Professionals',
    iconName: 'users',
  },
  {
    id: 'experience',
    title: '15+ Years',
    subtitle: 'Enterprise EAM Experience',
    iconName: 'clock',
  },
  {
    id: 'sectors',
    title: '8+ Sectors',
    subtitle: 'Global Industries Served',
    iconName: 'globe',
  },
];

export const CAPABILITIES: CapabilityCardData[] = [
  {
    id: 'maximo-migration',
    category: 'Asset Management',
    title: 'IBM Maximo & MAS Migration',
    description:
      'End-to-end Maximo implementation, seamless MAS 8/9 migration, automation scripting, mobile enablement, and workflow optimization.',
    ctaText: 'Explore Maximo services',
    imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    iconName: 'settings',
    technicalDetails: {
      overview:
        'Migrate from legacy Maximo 7.6 to IBM Maximo Application Suite (MAS 8 and 9) running on Red Hat OpenShift on AWS, Azure, or private cloud with zero downtime.',
      keyDeliverables: [
        'Red Hat OpenShift operator provisioning & container architecture',
        'Database migration and schema mapping (DB2, Oracle, MS SQL)',
        'Custom Jython & Python automation scripts refactoring',
        'Maximo Mobile & offline technician synchronization',
        'MAS Manage, Monitor, Health, and Predict enablement',
      ],
      supportedTech: ['IBM MAS 8/9', 'Maximo 7.6.1.x', 'Red Hat OpenShift', 'Kafka', 'PostgreSQL / DB2'],
      businessValue: '35% reduction in unplanned equipment downtime and 25% lower total cost of ownership.',
    },
  },
  {
    id: 'enterprise-integration',
    category: 'Connected Systems',
    title: 'Enterprise Integration',
    description:
      'Unify your data across SAP, Oracle, REST APIs, middleware solutions, real-time data sync, and Microsoft Azure AD integrations.',
    ctaText: 'Explore integrations',
    imageSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    iconName: 'link',
    technicalDetails: {
      overview:
        'Seamless bidirectional enterprise connectors linking Maximo with SAP ERP, Oracle Financials, SCADA telemetry, and enterprise identity management.',
      keyDeliverables: [
        'Enterprise Adapter for SAP (MIF / MEA) and Oracle eBS',
        'Event-driven streaming with Apache Kafka and RabbitMQ',
        'RESTful & GraphQL API gateway orchestration',
        'SSO, SCIM, and Azure Active Directory federation',
        'High-volume IoT telemetry ingestion pipelines',
      ],
      supportedTech: ['MIF (Maximo Integration Framework)', 'SAP S/4HANA', 'Oracle Cloud', 'MuleSoft', 'Azure AD'],
      businessValue: '100% data fidelity between financial ledgers and plant maintenance work orders.',
    },
  },
  {
    id: 'cloud-infrastructure',
    category: 'Cloud Scale',
    title: 'Cloud & Infrastructure',
    description:
      'Resilient AWS deployments, Azure administration, disaster backup & recovery, virtualization, and full-stack monitoring solutions.',
    ctaText: 'Explore cloud solutions',
    imageSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    iconName: 'cloud',
    technicalDetails: {
      overview:
        'Cloud-native architecture designed for 99.99% enterprise SLA, automated scaling, secure VPC peering, and automated disaster recovery.',
      keyDeliverables: [
        'Terraform & Ansible Infrastructure as Code (IaC)',
        'Multi-AZ Red Hat OpenShift Container Platform on AWS / Azure',
        'Continuous compliance, SOC2, and CIS benchmark hardening',
        'Automated snapshotting and multi-region failover testing',
        'Datadog, Dynatrace, and Prometheus telemetry dashboards',
      ],
      supportedTech: ['AWS (ROSA)', 'Azure (ARO)', 'Terraform', 'Kubernetes', 'CloudWatch'],
      businessValue: 'Sub-minute recovery time objective (RTO) with zero single points of failure.',
    },
  },
  {
    id: 'tririga-support',
    category: 'Facilities & 24x7 Ops',
    title: 'TRIRIGA & Managed Support',
    description:
      'Intelligent facility management, lease accounting, and space optimization backed by 24x7 L2/L3 and AMS incident monitoring.',
    ctaText: 'Explore TRIRIGA & support',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    iconName: 'building',
    technicalDetails: {
      overview:
        'Holistic integrated workplace management systems (IWMS) paired with round-the-clock enterprise SLA response and certified L2/L3 engineers.',
      keyDeliverables: [
        'TRIRIGA space planning, reservation, and desk occupancy telemetry',
        'ASC 842 and IFRS 16 lease accounting compliance engine',
        '24x7x365 Application Management Services (AMS) SLA with 15-min response',
        'Proactive health checks, performance tuning, and patch management',
        'Dedicated customer success manager & monthly architecture reviews',
      ],
      supportedTech: ['IBM TRIRIGA', 'TRIRIGA Connector for BIM', 'BIRT Reporting', 'ITIL v4 Service Desk'],
      businessValue: '18% reduction in commercial real estate footprint costs and guaranteed 99.9% app uptime.',
    },
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Predictive maintenance & plant automation',
    category: 'Industrial',
    imageSrc: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    impactMetric: '32% Downtime Drop',
    caseSummary:
      'Implemented automated sensor telemetry and Maximo Predict across 14 discrete automotive assembly facilities.',
    complianceStandards: ['ISO 55001', 'OSHA 1910', 'Six Sigma'],
  },
  {
    id: 'utilities',
    name: 'Utilities',
    tagline: 'Grid reliability & field workforce mobility',
    category: 'Energy & Utilities',
    imageSrc: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    impactMetric: '44% Faster Dispatch',
    caseSummary:
      'Empowered 1,200+ field linesmen with Maximo Mobile and offline GIS mapping for high-voltage substation maintenance.',
    complianceStandards: ['NERC CIP', 'FERC', 'ISO 55000'],
  },
  {
    id: 'oil-and-gas',
    name: 'Oil & Gas',
    tagline: 'Upstream & downstream safety compliance',
    category: 'Energy & Utilities',
    imageSrc: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    impactMetric: 'Zero Safety Incidents',
    caseSummary:
      'Rigorous Permit to Work (PTW) workflows and calibration tracking integrated into off-shore drilling platforms.',
    complianceStandards: ['API 570', 'API 510', 'ATEX Directive'],
  },
  {
    id: 'government',
    name: 'Government',
    tagline: 'Public infrastructure & municipal asset lifecycle',
    category: 'Public & Healthcare',
    imageSrc: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    impactMetric: '100% Audit Readiness',
    caseSummary:
      'Modernized state-level water treatment and municipal road network assets under federal compliance mandates.',
    complianceStandards: ['FedRAMP', 'NIST 800-53', 'GASB 34'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Biomedical equipment & hospital facility uptime',
    category: 'Public & Healthcare',
    imageSrc: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    impactMetric: '99.98% Medical Uptime',
    caseSummary:
      'Automated preventative maintenance scheduling for 45,000+ clinical and imaging assets across 8 hospital campuses.',
    complianceStandards: ['Joint Commission (JCAHO)', 'FDA 21 CFR Part 11', 'HIPAA'],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    tagline: 'Large-scale capital projects & civil engineering',
    category: 'Industrial',
    imageSrc: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    impactMetric: '$14M Capital Saved',
    caseSummary:
      'Managed linear asset conditions, bridge inspections, and runway lifecycle maintenance for international ports.',
    complianceStandards: ['AASHTO', 'FAA Part 139', 'ISO 19650'],
  },
  {
    id: 'transportation',
    name: 'Transportation',
    tagline: 'Rail, transit & fleet maintenance intelligence',
    category: 'Real Estate & Fleet',
    imageSrc: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    impactMetric: '22% Fuel & Wear Cut',
    caseSummary:
      'Predictive component telemetry on locomotives and electric bus fleets linking telematics to automated work orders.',
    complianceStandards: ['FRA Safety Rules', 'FTA TAM', 'ISO 9001'],
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    tagline: 'TRIRIGA space planning & portfolio operations',
    category: 'Real Estate & Fleet',
    imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    impactMetric: '18% Footprint Trim',
    caseSummary:
      'Integrated IBM TRIRIGA IWMS for 6.5M sq ft commercial office portfolio with dynamic desk booking & IoT occupancy.',
    complianceStandards: ['LEED Certification', 'IFRS 16 / ASC 842', 'BOMA'],
  },
];
