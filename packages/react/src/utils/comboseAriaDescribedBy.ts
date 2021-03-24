export default (
  id: string,
  helperText: string | undefined,
  errorText: string | undefined,
  successText: string | undefined,
): string => {
  return [helperText && `${id}-helper`, errorText && `${id}-error`, successText && `${id}-success`]
    .filter((item) => item)
    .join(' ');
};
