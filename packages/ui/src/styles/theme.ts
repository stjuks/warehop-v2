class Color {
  private r: number;
  private g: number;
  private b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  opacity(value: number) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${value})`;
  }

  rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

export default {
  colors: {
    lightGrey: new Color(250, 250, 250),
    danger: new Color(245, 61, 61),
    success: new Color(36, 192, 32),
    warning: new Color(255, 191, 26),
    white: new Color(253, 253, 253),
    primary: new Color(6, 104, 249),
    primaryLight: new Color(26, 117, 255),
    lightColor1: new Color(241, 243, 244),
    text: new Color(6, 32, 71),
    lightText: new Color(109, 120, 120),
    midGrey: new Color(240, 240, 240),
    darkGrey: new Color(208, 208, 208),
    black: new Color(0, 0, 0),
  },
  shadows: {
    lightShadow: '0 0 0.5rem rgba(0, 0, 0, .05)',
    blueShadow: '0 0 0.5rem hsl(216, 100%, 90%)',
  },
  fonts: {
    primary: "'Roboto', serif",
    secondary: "'Red Hat Display', serif",
  },
};
