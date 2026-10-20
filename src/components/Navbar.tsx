import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Menu, X, Phone, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onSelectNav?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onSelectNav }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onSelectNav) {
      onSelectNav(id);
    }
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className="mica-nav sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 h-16 flex items-center justify-between text-[13px]">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 xl:gap-8">
          <a
            href="#"
            className="group flex items-center transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Go2Ways Home"
          >
            <img
              src="/assets/aistudio/image__3__fbc7c7c8.png"
              alt="Go2Ways"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav (>= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-[#262626] font-medium"
            aria-label="Main Navigation"
          >
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#0067B8] transition-colors duration-200"
            >
              IBM Maximo & MAS
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#0067B8] transition-colors duration-200"
            >
              TRIRIGA
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#0067B8] transition-colors duration-200"
            >
              Cloud & Infrastructure
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#0067B8] transition-colors duration-200"
            >
              Enterprise Integration
            </a>
            <a
              href="#industries"
              onClick={(e) => handleNavClick(e, 'industries')}
              className="hover:text-[#0067B8] transition-colors duration-200"
            >
              Industries
            </a>
            <a
              href="#calculator"
              onClick={(e) => handleNavClick(e, 'calculator')}
              className="hover:text-[#0067B8] transition-colors duration-200 text-[#0067B8] flex items-center gap-1.5 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0067B8]"></span>
              ROI Calculator
            </a>
          </nav>
        </div>

        {/* Right Actions & Contact */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <a
            href="mailto:support@go2ways.com"
            className="group hidden xl:inline-flex items-center gap-2 text-[#605E5C] hover:text-[#0067B8] transition-colors duration-200 text-xs font-medium"
            title="Email Go2Ways Enterprise Support"
          >
            <span className="fluent-icon-box !w-7 !h-7 bg-white/70">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <span>support@go2ways.com</span>
          </a>

          {/* Book Consultation Button */}
          <button
            onClick={onOpenConsultation}
            className="ms-btn-primary px-3 sm:px-4 py-2 rounded-[4px] text-xs font-semibold cursor-pointer shadow-xs hover:shadow-md"
            aria-label="Book an Enterprise Consultation"
          >
            <Calendar className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">Book a Consultation</span>
            <span className="sm:hidden">Consult</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Mobile & Tablet Hamburger Toggle: flex on mobile, forcefully hidden on lg (>=1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:!hidden fluent-icon-box !w-9 !h-9 bg-white shadow-xs cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#1B1A19]" /> : <Menu className="w-5 h-5 text-[#1B1A19]" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Drawer Overlay - positioned cleanly relative to viewport outside header */}
    {mobileMenuOpen && (
      <div
        id="mobile-navigation-drawer"
        className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start pt-16 animate-in fade-in duration-200"
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className="bg-white border-b border-black/10 px-6 py-6 shadow-2xl space-y-5 text-sm max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid gap-2 font-medium text-[#1B1A19]">
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-2.5 px-3 rounded-[4px] hover:bg-[#EFF6FC] hover:text-[#0067B8] transition-colors"
            >
              IBM Maximo & MAS 8/9
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-2.5 px-3 rounded-[4px] hover:bg-[#EFF6FC] hover:text-[#0067B8] transition-colors"
            >
              TRIRIGA Facilities & Real Estate
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-2.5 px-3 rounded-[4px] hover:bg-[#EFF6FC] hover:text-[#0067B8] transition-colors"
            >
              Cloud & OpenShift Infrastructure
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-2.5 px-3 rounded-[4px] hover:bg-[#EFF6FC] hover:text-[#0067B8] transition-colors"
            >
              Enterprise Integration & SAP/Oracle
            </a>
            <a
              href="#industries"
              onClick={(e) => handleNavClick(e, 'industries')}
              className="py-2.5 px-3 rounded-[4px] hover:bg-[#EFF6FC] hover:text-[#0067B8] transition-colors"
            >
              Industries Served (8 Sectors)
            </a>
            <a
              href="#calculator"
              onClick={(e) => handleNavClick(e, 'calculator')}
              className="py-2.5 px-3 rounded-[4px] bg-[#EFF6FC] text-[#0067B8] font-bold flex items-center justify-between"
            >
              <span>ROI & Downtime Calculator</span>
              <span className="text-[10px] uppercase tracking-wider bg-[#0067B8] text-white px-2 py-0.5 rounded">
                Interactive
              </span>
            </a>
          </div>

          <div className="pt-4 border-t border-black/10 flex flex-col gap-3 text-xs text-[#605E5C]">
            <a
              href="mailto:support@go2ways.com"
              className="flex items-center gap-2.5 hover:text-[#0067B8] transition-colors p-2.5 rounded bg-[#FAF9F8]"
            >
              <Mail className="w-4 h-4 text-[#0067B8]" />
              <span className="font-medium text-[#1B1A19]">support@go2ways.com</span>
            </a>
            <a
              href="tel:+918826949739"
              className="flex items-center gap-2.5 hover:text-[#0067B8] transition-colors p-2.5 rounded bg-[#FAF9F8]"
            >
              <Phone className="w-4 h-4 text-[#0067B8]" />
              <span className="font-medium text-[#1B1A19]">+91 8826949739</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="ms-btn-primary w-full justify-center py-3 rounded-[4px] text-xs font-semibold cursor-pointer"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
};
