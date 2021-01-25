export const calculatePercent = (qty: number, maxQty: number): number => {
  if (!qty || !maxQty || isNaN(qty) || isNaN(maxQty)) {
    return 0;
  }
  return (qty * 100) / maxQty;
};
