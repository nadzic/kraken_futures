export const formatTwoDecimals = (value: number): string => {
  if (!value || isNaN(value)) {
    return '0.00';
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
