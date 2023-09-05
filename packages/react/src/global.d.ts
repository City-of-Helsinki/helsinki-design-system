declare module '*.jpg';
declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.svg' {
  const path: string;
  export default path;
}
