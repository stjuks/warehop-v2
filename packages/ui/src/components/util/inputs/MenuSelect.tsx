import styled, { css } from 'styled-components';
import theme from '@ui/styles/theme';

import AriaSelect from '../../Form/AriaSelect';
import SelectInput from '@ui/components/FormNew/SelectInput';

export const styledInput = {
  general: () => css`
    .input-container {
      border-radius: 1.25rem;
      border: 1px solid ${theme.colors.midGrey.rgb()};
      background: ${theme.colors.white.rgb()};
      padding: 0 0.5rem;

      .actions {
        right: 0.5rem;
      }

      .input-field {
        font-size: 0.875rem;
      }
    }

    .input-container:hover,
    .input-container[data-focused='true'] {
      background: ${theme.colors.white.rgb()};
      border: 1px solid ${theme.colors.darkGrey.rgb()};
    }

    .input-container[data-focused='true'] {
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
  padding: 0;
  ${styledInput.general()}

  .select-menu {
    left: -1px;
    width: calc(100% + 2px);

    .select-menu-item,
    .search-input {
      padding-left: 0.75rem;
    }
  }

  .input-field[aria-expanded='true'] + .select-menu {
    border: 1px solid ${theme.colors.darkGrey.rgb()};
  }

  .input-container[data-focused=true],
  &[data-opened=true] .input-container {
    border-color: ${theme.colors.darkGrey.rgb()};
  }

  &[data-opened=true] .input-container {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
