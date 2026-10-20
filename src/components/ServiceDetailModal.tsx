import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Cpu, Award } from 'lucide-react';
import { CAPABILITIES } from '../data/content.ts';

interface ServiceDetailModalProps {
  serviceId: string | null;
  onClose: () => void;
  onBookConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  serviceId,
  onClose,
  onBookConsultation,
}) => {
  if (!serviceId) return null;

  const service = CAPABILITIES.find((s) => s.id === serviceId);
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div className="bg-white rounded-[6px] max-w-2xl w-full border border-black/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header with image banner */}
        <div className="relative h-36 sm:h-44 shrink-0 overflow-hidden bg-[#1B1A19]">
          <img
            src={service.imageSrc}
            alt={service.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 fluent-icon-box !w-7 sm:!w-8 !h-7 sm:!h-8 bg-white/90 text-[#1B1A19] hover:bg-white cursor-pointer"
            aria-label="Close service details"
          >
            <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-white">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#66b3ff] bg-black/40 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 rounded">
              {service.category}
            </span>
            <h2 id="service-modal-title" className="text-xl sm:text-2xl font-bold mt-1 tracking-tight text-white leading-tight">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-xs sm:text-sm">
          <div>
            <h3 className="text-xs font-bold uppercase text-[#605E5C] mb-1.5 sm:mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0067B8]" />
              Architecture & Overview
            </h3>
            <p className="text-[#1B1A19] leading-relaxed text-xs sm:text-[15px]">
              {service.technicalDetails.overview}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-[#605E5C] mb-2 sm:mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#0067B8]" />
              Core Technical Deliverables
            </h3>
            <div className="grid gap-2">
              {service.technicalDetails.keyDeliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#1B1A19]">
                  <CheckCircle2 className="w-4 h-4 text-[#0067B8] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EFF6FC] border border-[#0067B8]/20 p-3 sm:p-4 rounded-[6px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#0067B8] mb-1">
              <Award className="w-3.5 h-3.5" />
              Verified Business Impact
            </div>
            <p className="text-xs font-semibold text-[#1B1A19]">
              {service.technicalDetails.businessValue}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-[#605E5C] mb-2">
              Technology Stack & Connectors
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {service.technicalDetails.supportedTech.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] sm:text-xs bg-[#FAF9F8] border border-black/10 px-2 sm:px-2.5 py-1 rounded text-[#1B1A19] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
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
              onBookConsultation(service.title);
            }}
            className="ms-btn-primary justify-center px-5 py-2 rounded-[4px] text-xs font-semibold text-center"
          >
            <span>Request {service.title} Strategy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
