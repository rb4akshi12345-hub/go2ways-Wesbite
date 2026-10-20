import React from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { IndustryItem } from '../types.ts';

interface IndustryDetailModalProps {
  industry: IndustryItem | null;
  onClose: () => void;
  onBookConsultation: (sectorName: string) => void;
}

export const IndustryDetailModal: React.FC<IndustryDetailModalProps> = ({
  industry,
  onClose,
  onBookConsultation,
}) => {
  if (!industry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="industry-modal-title"
    >
      <div className="bg-white rounded-[6px] max-w-xl w-full border border-black/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Banner */}
        <div className="relative h-36 sm:h-44 shrink-0 overflow-hidden bg-black">
          <img
            src={industry.imageSrc}
            alt={industry.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 fluent-icon-box !w-7 sm:!w-8 !h-7 sm:!h-8 bg-white/90 text-[#1B1A19] hover:bg-white cursor-pointer"
            aria-label="Close sector details"
          >
            <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-white">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#66b3ff] bg-black/40 px-2 py-0.5 rounded">
              {industry.category} Sector
            </span>
            <h2 id="industry-modal-title" className="text-xl sm:text-2xl font-bold mt-1 text-white leading-tight">
              {industry.name} Operations
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-xs sm:text-sm overflow-y-auto">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase text-[#0067B8] tracking-wider">
              Sector Challenge & Focus
            </span>
            <p className="text-[#1B1A19] font-medium text-sm sm:text-base mt-1">
              {industry.tagline}
            </p>
          </div>

          <div className="bg-[#EFF6FC] border border-[#0067B8]/20 p-3 sm:p-4 rounded-[6px]">
            <p className="text-xs font-bold uppercase text-[#0067B8] mb-1">
              Field Implementation Case Study
            </p>
            <p className="text-xs font-semibold text-[#1B1A19] leading-relaxed">
              {industry.caseSummary}
            </p>
            <div className="mt-2 text-xs font-bold text-[#0067B8]">
              Demonstrated Outcome: {industry.impactMetric}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-[#605E5C] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0067B8]" />
              Regulatory & Compliance Enforcements
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {industry.complianceStandards.map((std, i) => (
                <span
                  key={i}
                  className="text-[11px] sm:text-xs bg-[#FAF9F8] border border-black/10 px-2 sm:px-2.5 py-1 rounded text-[#1B1A19] font-semibold"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-black/10 bg-[#FAF9F8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-[#605E5C] hover:text-[#1B1A19] text-center"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookConsultation(`${industry.name} Asset Modernization`);
            }}
            className="ms-btn-primary justify-center px-5 py-2 rounded-[4px] text-xs font-semibold text-center"
          >
            <span>Consult for {industry.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
