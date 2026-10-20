import React from 'react';
import { ShieldCheck, Cloud, Server, Users, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { METRIC_ITEMS } from '../data/content.ts';

interface MetricsRibbonProps {
  onSelectMetric?: (metricId: string) => void;
}

export const MetricsRibbon: React.FC<MetricsRibbonProps> = ({ onSelectMetric }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'shield':
        return <ShieldCheck className="w-4 h-4" />;
      case 'cloud':
        return <Cloud className="w-4 h-4" />;
      case 'server':
        return <Server className="w-4 h-4" />;
      case 'users':
        return <Users className="w-4 h-4" />;
      case 'clock':
        return <Clock className="w-4 h-4" />;
      case 'globe':
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <section className="bg-white border-b border-black/10 py-5 sm:py-7 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6"
      >
        {METRIC_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectMetric?.(item.id)}
            className="group flex items-start gap-2.5 sm:gap-3.5 cursor-pointer p-2 sm:p-2.5 rounded-[6px] hover:bg-[#EFF6FC]/50 transition-all duration-300"
          >
            {/* Square icon box: starts neutral, turns blue on hover with smooth cubic bezier */}
            <div className="fluent-icon-box shrink-0 !w-8 sm:!w-10 !h-8 sm:!h-10 group-hover:bg-[#0067B8] group-hover:text-white group-hover:border-[#0067B8] transition-all duration-350 shadow-xs">
              {getIcon(item.iconName)}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] sm:text-[17px] font-semibold text-[#1B1A19] group-hover:text-[#0067B8] transition-colors duration-300 leading-snug truncate">
                {item.title}
              </p>
              <p className="text-[11px] sm:text-xs text-[#605E5C] mt-0.5 group-hover:text-[#333333] transition-colors leading-tight">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
