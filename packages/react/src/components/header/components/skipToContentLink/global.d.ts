declare module '*.jpg';
declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}
