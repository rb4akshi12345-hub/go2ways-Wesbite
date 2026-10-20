import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#F2F2F2] border-t border-black/10 text-[#605E5C] text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-black/10">
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center">
              <img
                src="/assets/aistudio/image__3__fbc7c7c8.png"
                alt="Go2Ways"
                className="h-7 sm:h-8 w-auto object-contain bg-white px-2 py-1 rounded-[4px] border border-black/10 shadow-xs"
              />
            </div>
            <p className="text-xs text-[#605E5C] max-w-md leading-relaxed">
              Global enterprise consultancy specializing in IBM Maximo MAS 8/9 migration, TRIRIGA facilities transformation, Red Hat OpenShift cloud infrastructure, and enterprise ERP integration.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="ms-btn-primary px-4 py-2 rounded-[4px] text-xs font-semibold cursor-pointer"
              >
                Schedule Architecture Briefing
              </button>
            </div>
          </div>

          {/* Core Practices */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#1B1A19] mb-3">
              Specialized Practices
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#0067B8] transition-colors">
                  IBM Maximo MAS 8 / 9
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0067B8] transition-colors">
                  Maximo Mobile & GIS Field
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0067B8] transition-colors">
                  IBM TRIRIGA Real Estate IWMS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0067B8] transition-colors">
                  Red Hat OpenShift & ROSA
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0067B8] transition-colors">
                  SAP & Oracle MIF Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#1B1A19] mb-3">
              Global Operations
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0067B8] shrink-0 mt-0.5" />
                <span>Uttam Nagar, New Delhi, India, 110059</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0067B8] shrink-0" />
                <a href="tel:+918826949739" className="hover:text-[#0067B8] transition-colors font-medium">
                  +91 8826949739
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0067B8] shrink-0" />
                <a href="mailto:support@go2ways.com" className="text-[#0067B8] font-medium hover:underline">
                  support@go2ways.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-center sm:text-left">
          <p>
            Copyright © 2026 Go2Ways • Enterprise Asset Management & Cloud Modernization • All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#605E5C]">
              <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ISO 55001 & SOC2 Aligned
            </span>
            <button
              onClick={scrollToTop}
              className="fluent-icon-box !w-8 !h-8 bg-white hover:bg-[#0067B8] hover:text-white cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
