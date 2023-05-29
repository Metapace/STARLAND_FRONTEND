/**
 * @description 投放年龄段
 */
export const ageRange: Array<{ label: string; value: number }> = [
  { label: '13-17', value: 1 },
  { label: '18-24', value: 2 },
  { label: '25-34', value: 3 },
  { label: '35-44', value: 4 },
  { label: '45-54', value: 5 },
  { label: '55+', value: 6 },
  { label: 'not.limited', value: 7 },
];

/**
 * @description 投放性别
 */
export const gendarRange: Array<{ label: string; value: string }> = [
  { label: 'r.male', value: '1' },
  { label: 'r.female', value: '2' },
  { label: 'not.limited', value: '3' },
];

/**
 * @description 投放周期
 */
export const launchPeriod: Array<{ label: string; value: number }> = [
  { label: 'one.week', value: 1 },
  { label: 'half.month', value: 2 },
  { label: 'one.month', value: 3 },
  { label: 'three.month', value: 4 },
  { label: 'half.year', value: 5 },
];
