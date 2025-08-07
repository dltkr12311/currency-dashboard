import { UNIT_CATEGORIES } from '@/constants/units';
import { Unit, UnitCategory } from '@/types/unit';

/**
 * Convert value between units
 */
export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): number {
  if (fromUnit === toUnit) return value;

  const categoryData = UNIT_CATEGORIES.find(cat => cat.id === category);
  if (!categoryData) throw new Error(`Category ${category} not found`);

  const fromUnitData = categoryData.units.find(unit => unit.code === fromUnit);
  const toUnitData = categoryData.units.find(unit => unit.code === toUnit);

  if (!fromUnitData || !toUnitData) {
    throw new Error(`Unit not found: ${fromUnit} or ${toUnit}`);
  }

  // Special handling for temperature
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  // Convert to base unit first, then to target unit
  const baseValue = value * fromUnitData.toBase;
  const convertedValue = baseValue / toUnitData.toBase;

  return convertedValue;
}

/**
 * Special temperature conversion logic
 */
function convertTemperature(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  let celsius = value;

  // Convert to Celsius first
  if (fromUnit === 'f') {
    celsius = ((value - 32) * 5) / 9;
  } else if (fromUnit === 'k') {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target
  if (toUnit === 'f') {
    return (celsius * 9) / 5 + 32;
  } else if (toUnit === 'k') {
    return celsius + 273.15;
  }

  return celsius;
}

/**
 * Format unit value with appropriate decimal places
 */
export function formatUnitValue(value: number, _unit: string): string {
  if (value === 0) return '0';

  // Very small numbers
  if (Math.abs(value) < 0.001) {
    return value.toExponential(2);
  }

  // Small numbers (less than 1)
  if (Math.abs(value) < 1) {
    return value.toFixed(4).replace(/\.?0+$/, '');
  }

  // Normal numbers
  if (Math.abs(value) < 1000) {
    return value.toFixed(2).replace(/\.?0+$/, '');
  }

  // Large numbers
  if (Math.abs(value) < 1000000) {
    return value.toFixed(1).replace(/\.?0+$/, '');
  }

  // Very large numbers
  return value.toExponential(2);
}

/**
 * Get unit category by unit code
 */
export function getCategoryByUnit(unitCode: string): UnitCategory | undefined {
  return UNIT_CATEGORIES.find(category =>
    category.units.some(unit => unit.code === unitCode)
  );
}

/**
 * Get unit data by code
 */
export function getUnitByCode(
  unitCode: string
): { unit: Unit; category: UnitCategory } | undefined {
  for (const category of UNIT_CATEGORIES) {
    const unit = category.units.find(u => u.code === unitCode);
    if (unit) {
      return { unit, category };
    }
  }
  return undefined;
}

/**
 * Validate if conversion is possible between two units
 */
export function canConvert(fromUnit: string, toUnit: string): boolean {
  const fromData = getUnitByCode(fromUnit);
  const toData = getUnitByCode(toUnit);

  if (!fromData || !toData) return false;

  return fromData.category.id === toData.category.id;
}
