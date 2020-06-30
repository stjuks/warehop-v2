import styled from 'styled-components';
import theme from '@ui/styles/theme';

export const HeaderContainer = styled.div`
  background: ${theme.colors.white.rgb()};
  color: ${theme.colors.text.rgb()};
  box-shadow: ${theme.shadows.lightShadow};

  font-family: 'Red Hat Display', sans-serif !important;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  font-weight: 500;
  align-items: center;
  font-size: 1.25rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  z-index: 2;
  flex-shrink: 0;
`;

export const TitleContainer = styled.div`
  display: flex;

  &,
  .back-button {
    font-family: ${theme.fonts.secondary};
  }

  .back-button {
    min-width: 1.5rem;
    display: flex;
    align-items: center;
    font-weight: 500;

    .icon-container {
      display: flex;
      align-items: center;
      width: 1.5rem;
    }
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  z-index: 3;
  flex: 1;
  justify-content: flex-end;
  font-size: 1.75rem;
  margin-left: 0.75rem;
  color: ${theme.colors.text.rgb()};

  > * {
    display: flex;
    align-items: center;
  }

  > *:not(:last-child) {
    margin-right: 0.75rem;
  }

  svg {
    cursor: pointer;
    stroke-width: 1.5;
  }

  button {
    position: relative;
    outline: none;

    :hover:before,
    :focus:before {
      content: '';
      position: absolute;
      height: 0.25rem;
      width: 0.25rem;
      background: ${theme.colors.primary.rgb()};
      transform: translateX(-50%);
      left: 50%;
      top: calc(100% + 2px);
      border-radius: 50%;
      z-index: -1;
    }
  }
`;
