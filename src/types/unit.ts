export interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  units: Unit[];
}

export interface Unit {
  code: string;
  name: string;
  symbol?: string;
  toBase: number; // Conversion factor to base unit
  baseUnit?: boolean;
}

export interface UnitConversion {
  fromUnit: string;
  toUnit: string;
  fromValue: number;
  toValue: number;
  category: string;
}

export interface UnitConverterState {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromValue: string;
  toValue: string;
  isLoading: boolean;
}
