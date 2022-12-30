export {}

declare module '*.jpg';
declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare global {
  type SizeType = 's' | 'm' | 'l';
}
