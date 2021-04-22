export const ceilDecimal = (value: number, decimal = 0): number => {
  let multiplier = 1;
  if (decimal > 0) {
    // eslint-disable-next-line no-restricted-properties
    multiplier = Math.pow(10, decimal);
  }
  return Math.ceil(value * multiplier) / multiplier;
};

export default ceilDecimal;
