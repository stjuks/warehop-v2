import { css, CSSObject } from 'styled-components';

type MediaSize = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs';

type Media = Record<MediaSize, (...args: any) => any>;

const sizes: { [key in MediaSize]: number } = {
  xxl: 1440,
  xl: 1200,
  l: 1000,
  m: 768,
  s: 560,
  xs: 400,
  xxs: 320,
};

const media = Object.keys(sizes).reduce<Media>((acc, label) => {
  const emSize = sizes[label] / 16;

  acc[label] = (first: TemplateStringsArray | CSSObject, ...args: any[]) => css`
    @media (max-width: ${emSize}em) {
      ${css(first, ...args) as any};
    }
  `;

  return acc;
}, {} as any);

export default media;
