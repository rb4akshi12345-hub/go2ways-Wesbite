import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, ShieldCheck, ArrowRight, Building, Mail, User } from 'lucide-react';
import { ConsultationFormData, validateConsultationForm } from '../utils/logic.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNotes?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'IBM Maximo & MAS Migration',
  initialNotes = '',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    company: '',
    service: initialService,
    assetsTier: '1,000 - 5,000 Assets',
    notes: initialNotes,
  });

  const [date, setDate] = useState('2026-10-24');
  const [timeSlot, setTimeSlot] = useState('10:00 AM (EST)');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [initialService, initialNotes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateConsultationForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const randomCode = 'G2W-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="bg-white rounded-[6px] max-w-2xl w-full border border-black/10 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4.5 border-b border-black/10 flex items-center justify-between bg-[#FAF9F8]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="fluent-icon-box !w-7 sm:!w-8 !h-7 sm:!h-8 bg-[#0067B8] text-white shrink-0">
              <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </span>
            <div className="min-w-0">
              <h2 id="consultation-modal-title" className="text-sm sm:text-base font-bold text-[#1B1A19] truncate">
                Book Architecture Consultation
              </h2>
              <p className="text-[11px] sm:text-xs text-[#605E5C] truncate">
                Speak with a Principal Maximo & Cloud Architect
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="fluent-icon-box !w-7 sm:!w-8 !h-7 sm:!h-8 bg-white hover:bg-black/10 cursor-pointer shrink-0 ml-2"
            aria-label="Close consultation modal"
          >
            <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-sm">
          {isSubmitted ? (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1B1A19]">
                Consultation Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-[#605E5C] max-w-md mx-auto">
                Thank you, <strong className="text-[#1B1A19]">{formData.fullName}</strong>. A technical meeting invitation and calendar invite have been dispatched to <strong className="text-[#1B1A19]">{formData.email}</strong>.
              </p>

              <div className="bg-[#EFF6FC] border border-[#0067B8]/20 rounded-[6px] p-3.5 sm:p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#605E5C]">Reference ID:</span>
                  <span className="font-mono font-bold text-[#0067B8]">{referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#605E5C]">Service Focus:</span>
                  <span className="font-semibold text-[#1B1A19] truncate ml-2">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#605E5C]">Scheduled Window:</span>
                  <span className="font-semibold text-[#1B1A19]">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#605E5C]">Organization:</span>
                  <span className="font-semibold text-[#1B1A19] truncate ml-2">{formData.company}</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="ms-btn-primary px-6 py-2.5 rounded-[4px] text-xs font-semibold"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                  Primary Modernization Objective <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-black/20 rounded-[4px] px-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden bg-white"
                >
                  <option value="IBM Maximo & MAS Migration">IBM Maximo & MAS 8/9 Migration</option>
                  <option value="Enterprise Integration">Enterprise Integration (SAP, Oracle, SCADA)</option>
                  <option value="Cloud & Infrastructure">Cloud & Red Hat OpenShift Infrastructure</option>
                  <option value="TRIRIGA & Managed Support">IBM TRIRIGA & 24x7 AMS Support</option>
                  <option value="Comprehensive EAM Strategy">Comprehensive EAM Architecture Strategy</option>
                </select>
                {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
              </div>

              {/* Grid 2: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-[#605E5C]" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-black/20 rounded-[4px] pl-9 pr-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden"
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                    Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#605E5C]" />
                    <input
                      type="email"
                      placeholder="alex@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-black/20 rounded-[4px] pl-9 pr-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Grid 3: Company & Fleet Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                    Company / Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-2.5 text-[#605E5C]" />
                    <input
                      type="text"
                      placeholder="e.g. Global Energy Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full border border-black/20 rounded-[4px] pl-9 pr-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden"
                    />
                  </div>
                  {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                    Asset Inventory Tier
                  </label>
                  <select
                    value={formData.assetsTier}
                    onChange={(e) => setFormData({ ...formData, assetsTier: e.target.value })}
                    className="w-full border border-black/20 rounded-[4px] px-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden bg-white"
                  >
                    <option value="Under 500 Assets">Under 500 Assets</option>
                    <option value="500 - 2,500 Assets">500 - 2,500 Assets</option>
                    <option value="2,500 - 10,000 Assets">2,500 - 10,000 Assets</option>
                    <option value="10,000+ Assets (Global Multi-Site)">10,000+ Assets (Global Multi-Site)</option>
                  </select>
                </div>
              </div>

              {/* Grid 4: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-black/20 rounded-[4px] px-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full border border-black/20 rounded-[4px] px-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden bg-white"
                  >
                    <option value="09:00 AM (EST)">09:00 AM (EST)</option>
                    <option value="11:00 AM (EST)">11:00 AM (EST)</option>
                    <option value="02:00 PM (EST)">02:00 PM (EST)</option>
                    <option value="04:00 PM (EST)">04:00 PM (EST)</option>
                  </select>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#605E5C] mb-1.5">
                  Project Scope or Specific Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Current Maximo version, databases, cloud preferences, or timeline..."
                  className="w-full border border-black/20 rounded-[4px] px-3 py-2 text-xs sm:text-sm focus:border-[#0067B8] focus:outline-hidden"
                />
              </div>

              {/* Trust Badge */}
              <div className="bg-[#FAF9F8] p-2.5 sm:p-3 rounded-[4px] border border-black/10 flex items-center gap-2.5 text-[11px] sm:text-xs text-[#605E5C]">
                <ShieldCheck className="w-4 h-4 text-[#0067B8] shrink-0" />
                <span>
                  All architectural blueprints discussed are protected by strict bilateral NDA.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-black/20 rounded-[4px] text-xs font-semibold text-[#1B1A19] hover:bg-black/5 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ms-btn-primary justify-center px-6 py-2 rounded-[4px] text-xs font-semibold text-center"
                >
                  <span>Confirm Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
