export default (
  id: string,
  helperText: string | undefined,
  errorText: string | undefined,
  successText: string | undefined,
  infoText: string | undefined,
): string | null => {
  const ids = [
    helperText && `${id}-helper`,
    errorText && `${id}-error`,
    successText && `${id}-success`,
    infoText && `${id}-info`,
  ].filter((item) => item);

  return ids.length ? ids.join(' ') : null;
};
