import { UnitCategory } from '@/types/unit';

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: '길이',
    icon: '📏',
    units: [
      { code: 'mm', name: '밀리미터', symbol: 'mm', toBase: 0.001 },
      { code: 'cm', name: '센티미터', symbol: 'cm', toBase: 0.01 },
      { code: 'm', name: '미터', symbol: 'm', toBase: 1, baseUnit: true },
      { code: 'km', name: '킬로미터', symbol: 'km', toBase: 1000 },
      { code: 'in', name: '인치', symbol: 'in', toBase: 0.0254 },
      { code: 'ft', name: '피트', symbol: 'ft', toBase: 0.3048 },
      { code: 'yd', name: '야드', symbol: 'yd', toBase: 0.9144 },
      { code: 'mi', name: '마일', symbol: 'mi', toBase: 1609.344 },
    ],
  },
  {
    id: 'weight',
    name: '무게',
    icon: '⚖️',
    units: [
      { code: 'mg', name: '밀리그램', symbol: 'mg', toBase: 0.001 },
      { code: 'g', name: '그램', symbol: 'g', toBase: 1, baseUnit: true },
      { code: 'kg', name: '킬로그램', symbol: 'kg', toBase: 1000 },
      { code: 't', name: '톤', symbol: 't', toBase: 1000000 },
      { code: 'oz', name: '온스', symbol: 'oz', toBase: 28.3495 },
      { code: 'lb', name: '파운드', symbol: 'lb', toBase: 453.592 },
    ],
  },
  {
    id: 'temperature',
    name: '온도',
    icon: '🌡️',
    units: [
      { code: 'c', name: '섭씨', symbol: '°C', toBase: 1, baseUnit: true },
      { code: 'f', name: '화씨', symbol: '°F', toBase: 1 },
      { code: 'k', name: '켈빈', symbol: 'K', toBase: 1 },
    ],
  },
  {
    id: 'area',
    name: '넓이',
    icon: '📐',
    units: [
      { code: 'mm2', name: '제곱밀리미터', symbol: 'mm²', toBase: 0.000001 },
      { code: 'cm2', name: '제곱센티미터', symbol: 'cm²', toBase: 0.0001 },
      { code: 'm2', name: '제곱미터', symbol: 'm²', toBase: 1, baseUnit: true },
      { code: 'km2', name: '제곱킬로미터', symbol: 'km²', toBase: 1000000 },
      { code: 'in2', name: '제곱인치', symbol: 'in²', toBase: 0.00064516 },
      { code: 'ft2', name: '제곱피트', symbol: 'ft²', toBase: 0.092903 },
      { code: 'acre', name: '에이커', symbol: 'acre', toBase: 4046.86 },
    ],
  },
  {
    id: 'volume',
    name: '부피',
    icon: '🥤',
    units: [
      { code: 'ml', name: '밀리리터', symbol: 'mL', toBase: 0.001 },
      { code: 'l', name: '리터', symbol: 'L', toBase: 1, baseUnit: true },
      { code: 'm3', name: '세제곱미터', symbol: 'm³', toBase: 1000 },
      { code: 'gal', name: '갤런', symbol: 'gal', toBase: 3.78541 },
      { code: 'qt', name: '쿼트', symbol: 'qt', toBase: 0.946353 },
      { code: 'pt', name: '파인트', symbol: 'pt', toBase: 0.473176 },
      { code: 'cup', name: '컵', symbol: 'cup', toBase: 0.236588 },
      { code: 'fl_oz', name: '액량온스', symbol: 'fl oz', toBase: 0.0295735 },
    ],
  },
  {
    id: 'time',
    name: '시간',
    icon: '⏰',
    units: [
      { code: 'ms', name: '밀리초', symbol: 'ms', toBase: 0.001 },
      { code: 's', name: '초', symbol: 's', toBase: 1, baseUnit: true },
      { code: 'min', name: '분', symbol: 'min', toBase: 60 },
      { code: 'h', name: '시간', symbol: 'h', toBase: 3600 },
      { code: 'd', name: '일', symbol: 'd', toBase: 86400 },
      { code: 'week', name: '주', symbol: 'week', toBase: 604800 },
      { code: 'month', name: '월', symbol: 'month', toBase: 2629746 },
      { code: 'year', name: '년', symbol: 'year', toBase: 31556952 },
    ],
  },
];

export const POPULAR_CONVERSIONS = [
  { category: 'length', from: 'm', to: 'ft', label: '미터 → 피트' },
  { category: 'weight', from: 'kg', to: 'lb', label: '킬로그램 → 파운드' },
  { category: 'temperature', from: 'c', to: 'f', label: '섭씨 → 화씨' },
  { category: 'volume', from: 'l', to: 'gal', label: '리터 → 갤런' },
];

export const UNIT_QUICK_AMOUNTS = [1, 5, 10, 50, 100];
