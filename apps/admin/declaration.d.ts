// @ts-ignore
// @eslint-ignore
declare module '@arco-design/color' {
  export { generate, getRgbStr } from './node_modules/@arco-design/color/src/index';
}
declare module 'react-dom/client' {
  export { createRoot } from 'react-dom/clien';
}
declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module 'nprogress' {
  import nprogress from 'nprogress';
  export default nprogress;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
  export default content;
}

declare module '*.png';

declare module 'react-lazy-load-image-component';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
