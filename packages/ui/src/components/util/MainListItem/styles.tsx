import styled, { keyframes } from 'styled-components';
import theme from '@ui/styles/theme';

import Link from '../Link';

export const MainListItemContainer = styled(Link)`
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;

  :hover,
  :focus {
    outline: none;
    background: ${theme.colors.lightGrey.rgb()};
    box-shadow: ${theme.shadows.lightShadow};

    :after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${theme.colors.primary.rgb()};
    }
  }

  .content {
    flex: 1;
    display: flex;
  }

  .chevron {
    width: 2rem;
    color: ${theme.colors.lightText.rgb()};
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  :not(:first-child) {
    border-top: 1px solid ${theme.colors.lightColor1.rgb()};
  }
`;
