import { css } from 'styled-components';

export default {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  engulf: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,
  engulfFixed: css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,
};
