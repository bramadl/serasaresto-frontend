export const parseOrderNumber = (number: number): string => {
  if (number < 10) return `#00${number}`;
  if (number < 100) return `#0${number}`;
  return `#${number}`;
};
