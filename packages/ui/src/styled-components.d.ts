import { theme } from './util/styled';

type Theme = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
