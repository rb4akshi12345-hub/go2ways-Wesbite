import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDUSTRIES } from '../data/content.ts';
import { IndustryItem } from '../types.ts';

interface IndustriesBentoProps {
  onSelectIndustry: (industry: IndustryItem) => void;
}

export const IndustriesBento: React.FC<IndustriesBentoProps> = ({ onSelectIndustry }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterTabs = ['All', 'Industrial', 'Energy & Utilities', 'Public & Healthcare', 'Real Estate & Fleet'];

  const filteredIndustries = selectedFilter === 'All'
    ? INDUSTRIES
    : INDUSTRIES.filter((item) => item.category === selectedFilter);

  return (
    <section id="industries" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 pb-16 sm:pb-24">
      {/* Section Header with Reveal on Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0067B8] mb-1.5 sm:mb-2">
            Industries We Power
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1B1A19] tracking-tight">
            Transforming physical assets across 8 key sectors
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#605E5C] max-w-md">
          Tailored EAM, cloud, and automation blueprints designed for high-compliance, asset-intensive environments.
        </p>
      </motion.div>

      {/* Filter Tabs with Reveal on Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
        role="tablist"
        aria-label="Industry filter tabs"
      >
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedFilter(tab)}
              className={`whitespace-nowrap shrink-0 px-3.5 sm:px-4 py-1.5 text-xs font-semibold rounded-[4px] transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0067B8] text-white shadow-xs'
                  : 'bg-white text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0067B8] border border-black/10'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </motion.div>

      {/* 8 Bento Cards with Staggered Reveal on Scroll and Filter Transitions */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredIndustries.map((ind, idx) => (
            <motion.div
              key={ind.id}
              layout
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.55,
                delay: (idx % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <div
                onClick={() => onSelectIndustry(ind)}
                className="fluent-card group relative h-64 sm:h-72 cursor-pointer transition-all duration-300 h-full"
                role="button"
                tabIndex={0}
                aria-label={`View ${ind.name} sector case study`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectIndustry(ind);
                  }
                }}
              >
                {/* Background image */}
                <img
                  src={ind.imageSrc}
                  alt={ind.name}
                  className="card-img w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-5 flex flex-col justify-between text-white">
                  {/* Top pill badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded text-white group-hover:bg-[#0067B8] group-hover:text-white transition-colors duration-300">
                      {ind.impactMetric}
                    </span>

                    {/* Corner icon badge */}
                    <span className="industry-badge-icon shadow-md !w-7 !h-7 sm:!w-[34px] sm:!h-[34px]">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>

                  {/* Bottom text */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 tracking-tight group-hover:text-[#66b3ff] transition-colors duration-200">
                      {ind.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-200 leading-snug line-clamp-2">
                      {ind.tagline}
                    </p>

                    {/* Hover reveal tags */}
                    <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-[11px] text-gray-300">
                      <span>{ind.complianceStandards[0]}</span>
                      <span className="text-white font-medium group-hover:underline">Read details →</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
