import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroCarousel } from './components/HeroCarousel.tsx';
import { MetricsRibbon } from './components/MetricsRibbon.tsx';
import { CapabilitiesSection } from './components/CapabilitiesSection.tsx';
import { IndustriesBento } from './components/IndustriesBento.tsx';
import { RoiCalculatorSection } from './components/RoiCalculatorSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { IndustryDetailModal } from './components/IndustryDetailModal.tsx';
import { IndustryItem } from './types.ts';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('IBM Maximo & MAS Migration');
  const [consultationNotes, setConsultationNotes] = useState('');

  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem | null>(null);

  const handleOpenConsultation = (serviceName?: string, notes?: string) => {
    if (serviceName) {
      setConsultationService(serviceName);
    }
    if (notes) {
      setConsultationNotes(notes);
    }
    setIsConsultationOpen(true);
  };

  const handleOpenServiceDetail = (serviceId: string) => {
    setActiveServiceId(serviceId);
  };

  const handleOpenIndustryDetail = (industry: IndustryItem) => {
    setActiveIndustry(industry);
  };

  const handleMetricSelect = (metricId: string) => {
    if (metricId === 'ibm-partner') {
      setActiveServiceId('maximo-migration');
    } else if (metricId === 'aws-tier' || metricId === 'redhat') {
      setActiveServiceId('cloud-infrastructure');
    } else {
      handleOpenConsultation(
        'Enterprise Strategy Session',
        `Inquiring regarding Go2Ways ${metricId} credentials & certified team expertise.`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F8] text-[#1B1A19]">
      {/* 1. Header & Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Working 4-Second Hero Carousel */}
        <HeroCarousel
          onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
          onOpenServiceDetail={handleOpenServiceDetail}
        />

        {/* 3. Credentials & Metrics Ribbon */}
        <MetricsRibbon onSelectMetric={handleMetricSelect} />

        {/* 4. Core Capabilities (turns blue on hover matching screenshot) */}
        <CapabilitiesSection onSelectService={handleOpenServiceDetail} />

        {/* 5. 8 Industries Bento Grid */}
        <IndustriesBento onSelectIndustry={handleOpenIndustryDetail} />

        {/* 6. Interactive ROI & Downtime Calculator */}
        <RoiCalculatorSection
          onScheduleWithMetrics={(summary) =>
            handleOpenConsultation('Comprehensive EAM Strategy', summary)
          }
        />
      </main>

      {/* 7. Footer */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Modals & Dialogs */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationService}
        initialNotes={consultationNotes}
      />

      <ServiceDetailModal
        serviceId={activeServiceId}
        onClose={() => setActiveServiceId(null)}
        onBookConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
      />

      <IndustryDetailModal
        industry={activeIndustry}
        onClose={() => setActiveIndustry(null)}
        onBookConsultation={(sectorTitle) =>
          handleOpenConsultation(sectorTitle, `Requesting case study & architectural briefing for ${sectorTitle}.`)
        }
      />
    </div>
  );
}
