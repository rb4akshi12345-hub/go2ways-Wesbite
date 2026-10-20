import React, { useState, useId } from 'react';
import { Calculator, ArrowRight, TrendingUp, Clock, ShieldCheck, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { calculateEamRoi } from '../utils/logic.ts';

interface RoiCalculatorSectionProps {
  onScheduleWithMetrics: (summary: string) => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({ onScheduleWithMetrics }) => {
  const [assetCount, setAssetCount] = useState<number>(2500);
  const [techCount, setTechCount] = useState<number>(35);
  const [downtimeHours, setDowntimeHours] = useState<number>(75);
  const [hourlyCost, setHourlyCost] = useState<number>(3000);

  const assetCountId = useId();
  const techCountId = useId();
  const downtimeHoursId = useId();
  const hourlyCostId = useId();

  const results = calculateEamRoi(assetCount, techCount, downtimeHours, hourlyCost);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCta = () => {
    const summary = `ROI Projection: ${assetCount.toLocaleString()} assets, ${techCount} techs. Projected annual savings: ${formatCurrency(
      results.annualDowntimeSavings + results.inventoryCarryingReduction
    )} with estimated ${results.estimatedMasMigrationWeeks}-week MAS migration timeline.`;
    onScheduleWithMetrics(summary);
  };

  return (
    <section id="calculator" className="bg-[#F2F2F2] border-y border-black/10 py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="fluent-icon-box !w-7 !h-7 bg-white text-[#0067B8]">
              <Calculator className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0067B8]">
              Enterprise Value Model
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1B1A19] tracking-tight">
            Estimate your EAM & MAS Modernization ROI
          </h2>
          <p className="text-xs sm:text-sm text-[#605E5C] mt-2">
            Model the tangible business savings from predictive maintenance, automated MRO inventory, and streamlined Maximo work orders.
          </p>
        </motion.div>

        {/* 2-Column or Stacked Responsive Layout */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start"
        >
          {/* Sliders Input Column */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-7 lg:p-8 rounded-[6px] border border-black/10 shadow-xs space-y-5 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-[#1B1A19] pb-3 sm:pb-4 border-b border-black/10">
              Operational Fleet Parameters
            </h3>

            {/* Parameter 1: Total Managed Assets */}
            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                <label htmlFor={assetCountId} className="text-[#1B1A19]">Total Managed Physical Assets</label>
                <span className="text-[#0067B8] font-mono font-bold bg-[#EFF6FC] px-2 py-0.5 rounded text-xs sm:text-sm">
                  {assetCount.toLocaleString()} units
                </span>
              </div>
              <input
                id={assetCountId}
                type="range"
                min="100"
                max="25000"
                step="100"
                value={assetCount}
                onChange={(e) => setAssetCount(Number(e.target.value))}
                className="w-full accent-[#0067B8] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-[#605E5C] mt-1">
                <span>100</span>
                <span>10,000</span>
                <span>25,000+</span>
              </div>
            </div>

            {/* Parameter 2: Active Maintenance Technicians */}
            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                <label htmlFor={techCountId} className="text-[#1B1A19]">Maintenance Technicians & Engineers</label>
                <span className="text-[#0067B8] font-mono font-bold bg-[#EFF6FC] px-2 py-0.5 rounded text-xs sm:text-sm">
                  {techCount} personnel
                </span>
              </div>
              <input
                id={techCountId}
                type="range"
                min="5"
                max="250"
                step="5"
                value={techCount}
                onChange={(e) => setTechCount(Number(e.target.value))}
                className="w-full accent-[#0067B8] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-[#605E5C] mt-1">
                <span>5</span>
                <span>100</span>
                <span>250+</span>
              </div>
            </div>

            {/* Parameter 3: Unplanned Downtime Hours/Year */}
            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                <label htmlFor={downtimeHoursId} className="text-[#1B1A19]">Current Unplanned Downtime / Year</label>
                <span className="text-[#0067B8] font-mono font-bold bg-[#EFF6FC] px-2 py-0.5 rounded text-xs sm:text-sm">
                  {downtimeHours} hours
                </span>
              </div>
              <input
                id={downtimeHoursId}
                type="range"
                min="10"
                max="300"
                step="5"
                value={downtimeHours}
                onChange={(e) => setDowntimeHours(Number(e.target.value))}
                className="w-full accent-[#0067B8] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-[#605E5C] mt-1">
                <span>10 hrs</span>
                <span>150 hrs</span>
                <span>300 hrs</span>
              </div>
            </div>

            {/* Parameter 4: Cost per downtime hour */}
            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                <label htmlFor={hourlyCostId} className="text-[#1B1A19]">Avg Facility Cost / Hour of Outage</label>
                <span className="text-[#0067B8] font-mono font-bold bg-[#EFF6FC] px-2 py-0.5 rounded text-xs sm:text-sm">
                  {formatCurrency(hourlyCost)} / hr
                </span>
              </div>
              <input
                id={hourlyCostId}
                type="range"
                min="500"
                max="10000"
                step="250"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full accent-[#0067B8] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-[#605E5C] mt-1">
                <span>$500/hr</span>
                <span>$5,000/hr</span>
                <span>$10,000/hr</span>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-7 lg:p-8 rounded-[6px] border border-black/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/10 mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#1B1A19]">
                  Projected Enterprise Value
                </h3>
                <span className="text-[11px] sm:text-xs font-semibold text-[#0067B8] bg-[#EFF6FC] px-2.5 py-1 rounded">
                  Maximo + MAS 9
                </span>
              </div>

              {/* Big Metric Box */}
              <div className="bg-[#EFF6FC] border border-[#0067B8]/20 rounded-[6px] p-4 sm:p-6 mb-5 sm:mb-6">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0067B8] mb-1">
                  Total 5-Year Net Economic Impact
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0067B8] tracking-tight">
                  {formatCurrency(results.fiveYearEstimatedRoi)}
                </p>
                <p className="text-[11px] sm:text-xs text-[#605E5C] mt-1.5">
                  Combines downtime elimination, inventory carrying reductions, and technician mobile efficiency.
                </p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="p-3.5 sm:p-4 rounded-[6px] border border-black/10 bg-[#FAF9F8]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#605E5C] mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#0067B8]" />
                    <span>Annual Downtime Savings</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-[#1B1A19]">
                    {formatCurrency(results.annualDowntimeSavings)}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-[6px] border border-black/10 bg-[#FAF9F8]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#605E5C] mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0067B8]" />
                    <span>MRO Carrying Cost Cut</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-[#1B1A19]">
                    {formatCurrency(results.inventoryCarryingReduction)}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-[6px] border border-black/10 bg-[#FAF9F8]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#605E5C] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#0067B8]" />
                    <span>Technician Hours Saved</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-[#1B1A19]">
                    {results.maintenanceEfficiencyGainHours.toLocaleString()} hrs / yr
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-[6px] border border-black/10 bg-[#FAF9F8]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#605E5C] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0067B8]" />
                    <span>Estimated MAS Go-Live</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-[#1B1A19]">
                    {results.estimatedMasMigrationWeeks} Weeks
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCta}
              className="ms-btn-primary w-full justify-center py-3 sm:py-3.5 px-4 sm:px-6 rounded-[4px] text-xs sm:text-sm font-semibold cursor-pointer shadow-xs text-center"
            >
              <span>Get Detailed ROI Assessment for Your Organization</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
