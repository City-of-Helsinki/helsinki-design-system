export const isElementAttributeTruthy = (value: string | null) => {
  if (!value || value === 'false') {
    return false;
  }
  return true;
};
