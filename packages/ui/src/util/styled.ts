import baseStyled, { ThemedStyledInterface } from 'styled-components';
import QixColor from 'color';

export class Color {
  private color: QixColor;

  constructor(colorValue: string) {
    this.color = QixColor(colorValue);
  }

  opacity = (percentage: number) => {
    return this.color.alpha(percentage).string();
  };

  toString() {
    return this.color.string();
  }
}

export const theme = {
  lightShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, .05)',
  blueShadow: '0 0 0.5rem hsl(216, 100%, 90%)',
  colors: {
    lightGrey: new Color('#FAFAFA'),
    danger: new Color('#F53D3D'),
    success: new Color('#24DF20'),
    warning: new Color('#FFBF1A'),
    white: new Color('#FDFDFD'),
    primary: new Color('#0668F9'),
    primaryLight: new Color('hsl(216, 100%, 55%)'),
    lightColor1: new Color('#F1F3F4'),
    text: new Color('#062047'),
    lightText: new Color('#6D7878'),
    midGrey: new Color('#F0F0F0'),
    darkGrey: new Color('#D0D0D0')
  }
};

export type Theme = typeof theme;

export default baseStyled as ThemedStyledInterface<Theme>;
