import { UNIT_CATEGORIES } from '@/constants/units';
import { UnitConverterState } from '@/types/unit';
import {
  canConvert,
  convertUnit,
  formatUnitValue,
} from '@/utils/unit-conversion';
import { useCallback, useState } from 'react';

export function useUnitConverter() {
  const [state, setState] = useState<UnitConverterState>({
    category: 'length',
    fromUnit: 'm',
    toUnit: 'ft',
    fromValue: '',
    toValue: '',
    isLoading: false,
  });

  const getCurrentCategory = useCallback(() => {
    return UNIT_CATEGORIES.find(cat => cat.id === state.category);
  }, [state.category]);

  const convert = useCallback(
    (value: number, fromUnit: string, toUnit: string, category: string) => {
      try {
        if (!canConvert(fromUnit, toUnit)) {
          throw new Error('Cannot convert between these units');
        }

        const result = convertUnit(value, fromUnit, toUnit, category);
        return formatUnitValue(result, toUnit);
      } catch (error) {
        console.error('Conversion error:', error);
        return '0';
      }
    },
    []
  );

  const handleFromValueChange = useCallback(
    (value: string) => {
      setState(prev => {
        const numericValue = parseFloat(value) || 0;
        const convertedValue =
          numericValue > 0
            ? convert(numericValue, prev.fromUnit, prev.toUnit, prev.category)
            : '';

        return {
          ...prev,
          fromValue: value,
          toValue: convertedValue,
        };
      });
    },
    [convert]
  );

  const handleToValueChange = useCallback(
    (value: string) => {
      setState(prev => {
        const numericValue = parseFloat(value) || 0;
        const convertedValue =
          numericValue > 0
            ? convert(numericValue, prev.toUnit, prev.fromUnit, prev.category)
            : '';

        return {
          ...prev,
          toValue: value,
          fromValue: convertedValue,
        };
      });
    },
    [convert]
  );

  const handleFromUnitChange = useCallback(
    (unit: string) => {
      setState(prev => {
        const numericValue = parseFloat(prev.fromValue) || 0;
        const convertedValue =
          numericValue > 0
            ? convert(numericValue, unit, prev.toUnit, prev.category)
            : '';

        return {
          ...prev,
          fromUnit: unit,
          toValue: convertedValue,
        };
      });
    },
    [convert]
  );

  const handleToUnitChange = useCallback(
    (unit: string) => {
      setState(prev => {
        const numericValue = parseFloat(prev.fromValue) || 0;
        const convertedValue =
          numericValue > 0
            ? convert(numericValue, prev.fromUnit, unit, prev.category)
            : '';

        return {
          ...prev,
          toUnit: unit,
          toValue: convertedValue,
        };
      });
    },
    [convert]
  );

  const handleCategoryChange = useCallback((categoryId: string) => {
    const category = UNIT_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return;

    const firstUnit = category.units[0];
    const secondUnit = category.units[1] || category.units[0];

    setState(prev => ({
      ...prev,
      category: categoryId,
      fromUnit: firstUnit.code,
      toUnit: secondUnit.code,
      fromValue: '',
      toValue: '',
    }));
  }, []);

  const swapUnits = useCallback(() => {
    setState(prev => ({
      ...prev,
      fromUnit: prev.toUnit,
      toUnit: prev.fromUnit,
      fromValue: prev.toValue,
      toValue: prev.fromValue,
    }));
  }, []);

  const clear = useCallback(() => {
    setState(prev => ({
      ...prev,
      fromValue: '',
      toValue: '',
    }));
  }, []);

  const setQuickAmount = useCallback(
    (amount: number) => {
      setState(prev => {
        const convertedValue = convert(
          amount,
          prev.fromUnit,
          prev.toUnit,
          prev.category
        );
        return {
          ...prev,
          fromValue: amount.toString(),
          toValue: convertedValue,
        };
      });
    },
    [convert]
  );

  return {
    state,
    getCurrentCategory,
    handleFromValueChange,
    handleToValueChange,
    handleFromUnitChange,
    handleToUnitChange,
    handleCategoryChange,
    swapUnits,
    clear,
    setQuickAmount,
  };
}
