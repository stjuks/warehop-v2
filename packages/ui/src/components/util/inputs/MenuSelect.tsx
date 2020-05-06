import styled from '@ui/util/styled';
import { css } from 'styled-components';
import AriaSelect from '../../Form/AriaSelect';

export const styledInput = {
  general: theme => `
    label {
      text-transform: uppercase;
      font-size: 0.75rem;
      color: ${theme.colors.lightText};
    }
    &, .input-container {
      margin: 0;
    }
    .error-message {
      display: none;
    }
    .value-container {
      padding-left: 1rem;
      font-size: 0.875rem;
    }
    .input-field {
      box-shadow: none;
      border-radius: 2rem;
      ::after {
        content: none;
      }
    }
    .input-indicator {
      padding-right: 0.5rem;
    }
    .placeholder {
      color: ${theme.colors.lightText};
      font-weight: 400;
    }
  `,
  button: {
    general: theme => `
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.midGrey};
      border-radius: 21px;
      transition: border-color 0.2s;
    `,
    hover: theme => `
      border-color: ${theme.colors.darkGrey};
    `
  }
};

export default styled(AriaSelect)`
  ${({ theme }) => `
    ${styledInput.general(theme)}

    .select-btn {
      ${styledInput.button.general(theme)}
    }
    .select-btn:focus,
    .select-btn:hover,
    .select-btn[aria-expanded="true"] {
      ${styledInput.button.hover(theme)}
    }
    .select-btn[aria-expanded="true"] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .select-menu {
      box-shadow: none;
      border: 1px solid ${theme.colors.darkGrey};
      top: 100%;
      border-top-width: 0;
      border-radius: 0 0 1.25rem 1.25rem;
    }
  `}
`;
