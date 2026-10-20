import React from 'react';
import { ArrowRight, Wrench, Share2, Cloud, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CAPABILITIES } from '../data/content.ts';

interface CapabilitiesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'settings':
        return <Wrench className="w-4 h-4" />;
      case 'link':
        return <Share2 className="w-4 h-4" />;
      case 'cloud':
        return <Cloud className="w-4 h-4" />;
      case 'building':
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="services" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-20">
      {/* Section Header with Reveal on Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 sm:mb-12"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-[#0067B8] mb-1.5 sm:mb-2">
          Core Capabilities
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1B1A19] tracking-tight">
          Solutions built for mission-critical operations
        </h2>
      </motion.div>

      {/* 4 Cards Grid with Staggered Reveal on Scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {CAPABILITIES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full"
          >
            <article
              onClick={() => onSelectService(service.id)}
              className="capability-card group cursor-pointer flex flex-col justify-between h-full"
              tabIndex={0}
              role="button"
              aria-label={`Explore ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectService(service.id);
                }
              }}
            >
              <div>
                {/* Card Image with subtle zoom and border effect */}
                <div className="card-image-wrapper h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Card Body — Smoothly transitions from white to Microsoft Blue on hover */}
                <div className="card-body p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="card-tag text-xs font-bold uppercase tracking-wider">
                      {service.category}
                    </span>
                    <span className="card-icon-box fluent-icon-box !w-8 !h-8">
                      {getIcon(service.iconName)}
                    </span>
                  </div>

                  <h3 className="card-title text-lg sm:text-xl font-semibold mb-2 leading-snug">
                    {service.title}
                  </h3>

                  <p className="card-desc text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    {service.description}
                  </p>

                  <div className="card-link text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
