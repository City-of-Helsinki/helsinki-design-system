export const isSsrEnvironment = () => {
  return typeof window === 'undefined' || typeof document === 'undefined';
};
