/**
 * Pure logic for carousel state transitions and timing calculations.
 */

export function getNextSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return (currentIndex + 1) % totalSlides;
}

export function getPrevSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

export function clampProgress(elapsedMs: number, totalDurationMs: number): number {
  if (totalDurationMs <= 0) return 100;
  const ratio = (elapsedMs / totalDurationMs) * 100;
  return Math.min(100, Math.max(0, Math.round(ratio * 10) / 10));
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  company: string;
  service: string;
  assetsTier: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateConsultationForm(data: Partial<ConsultationFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Please enter your company or organization name.';
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.service = 'Please select a primary service area.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface EamRoiCalculation {
  annualDowntimeSavings: number;
  inventoryCarryingReduction: number;
  maintenanceEfficiencyGainHours: number;
  estimatedMasMigrationWeeks: number;
  fiveYearEstimatedRoi: number;
}

export function calculateEamRoi(
  assetsCount: number,
  techniciansCount: number,
  downtimeHoursPerYear: number = 80,
  hourlyDowntimeCost: number = 2500
): EamRoiCalculation {
  const safeAssets = Math.max(10, assetsCount);
  const safeTechs = Math.max(1, techniciansCount);

  // Industry benchmark: Predictive Maximo reduces unplanned downtime by 28-35%
  const downtimeReductionFactor = 0.32;
  const annualDowntimeSavings = Math.round(downtimeHoursPerYear * hourlyDowntimeCost * downtimeReductionFactor);

  // MRO inventory reduction average $45/asset/year with automated reordering
  const inventoryCarryingReduction = Math.round(safeAssets * 48);

  // Technicians save ~4.5 hours per week on paperwork & automated work order dispatch
  const maintenanceEfficiencyGainHours = Math.round(safeTechs * 4.5 * 48);

  // Migration duration estimation based on asset complexity
  let estimatedMasMigrationWeeks = 8;
  if (safeAssets > 10000) {
    estimatedMasMigrationWeeks = 20;
  } else if (safeAssets > 2500) {
    estimatedMasMigrationWeeks = 14;
  } else if (safeAssets > 500) {
    estimatedMasMigrationWeeks = 10;
  }

  // 5-year ROI estimation (savings - estimated upgrade cost)
  const annualTotalBenefit = annualDowntimeSavings + inventoryCarryingReduction + (maintenanceEfficiencyGainHours * 65);
  const fiveYearEstimatedRoi = Math.round(annualTotalBenefit * 5 * 0.85);

  return {
    annualDowntimeSavings,
    inventoryCarryingReduction,
    maintenanceEfficiencyGainHours,
    estimatedMasMigrationWeeks,
    fiveYearEstimatedRoi,
  };
}
