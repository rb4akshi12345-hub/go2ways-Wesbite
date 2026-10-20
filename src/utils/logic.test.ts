import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  clampProgress,
  validateConsultationForm,
  calculateEamRoi,
} from './logic.ts';

test('carousel slide indexing wraps correctly forwards and backwards', () => {
  const total = 4;
  assert.equal(getNextSlideIndex(0, total), 1);
  assert.equal(getNextSlideIndex(3, total), 0);
  assert.equal(getPrevSlideIndex(0, total), 3);
  assert.equal(getPrevSlideIndex(2, total), 1);
  assert.equal(getNextSlideIndex(0, 0), 0);
});

test('clampProgress properly bounds ratio between 0 and 100', () => {
  assert.equal(clampProgress(0, 4000), 0);
  assert.equal(clampProgress(2000, 4000), 50);
  assert.equal(clampProgress(4000, 4000), 100);
  assert.equal(clampProgress(5000, 4000), 100);
  assert.equal(clampProgress(-10, 4000), 0);
});

test('validateConsultationForm validates mandatory fields and formats', () => {
  const invalid = validateConsultationForm({
    fullName: '',
    email: 'not-an-email',
    company: '',
    service: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.company);
  assert.ok(invalid.errors.service);

  const valid = validateConsultationForm({
    fullName: 'Jane Doe',
    email: 'jane@enterprise.com',
    company: 'Acme Global Infrastructure',
    service: 'IBM Maximo & MAS Migration',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculateEamRoi generates realistic downtime and savings metrics', () => {
  const roi = calculateEamRoi(1500, 25, 60, 3000);
  assert.ok(roi.annualDowntimeSavings > 0);
  assert.ok(roi.inventoryCarryingReduction > 0);
  assert.ok(roi.maintenanceEfficiencyGainHours > 0);
  assert.equal(roi.estimatedMasMigrationWeeks, 10);
  assert.ok(roi.fiveYearEstimatedRoi > 100000);
});
