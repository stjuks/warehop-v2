import styled from '@ui/util/styled';
import { css } from 'styled-components';
import AriaSelect from '../../Form/AriaSelect';
import SelectInput from '@ui/components/FormNew/SelectInput';

/* export const styledInput = {
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
}; */

export const styledInput = {
  general: (theme) => `
    .input-container {
      border-radius: 1.25rem;
      border: 1px solid ${theme.colors.midGrey};
      background: ${theme.colors.white};
      padding: 0 0.5rem;

      .actions {
        right: 0.5rem;
      }

      .input-field {
        font-size: 0.875rem;
      }
    }

    .input-container:hover,
    .input-container[data-focused="true"] {
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.darkGrey};
    }

    .input-container[data-focused="true"] {
      .actions {
        background: transparent;
      }
    }

    .active-line {
      display: none;
    }

    .error-message {
      display: none;
    }
  `,
  button: {
    general: (theme) => ``,
    hover: (theme) => ``,
  },
};

export default styled(SelectInput)`
  ${({ theme }) => `
    padding: 0;
    ${styledInput.general(theme)}

    .select-menu {
      left: -1px;
      width: calc(100% + 2px);

      .select-menu-item,
      .search-input {
        padding-left: 0.75rem;
      }
    }
    
    .input-field[aria-expanded="true"] + .select-menu {
      border: 1px solid ${theme.colors.darkGrey};
    }

    .input-container[data-focused="true"] {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}
`;

/* export default styled(SelectInput)`
` */
