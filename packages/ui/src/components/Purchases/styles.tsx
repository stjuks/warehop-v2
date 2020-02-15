import styled from '@ui/util/styled';
import AriaSelect from '../Form/AriaSelect';

interface DaysLeftStyledProps {
  diff: number | undefined;
  isPaid: boolean;
}

export const SelectStyled = styled(AriaSelect)`
  ${({ theme }) => `
        label {
            text-transform: uppercase;
            font-size: 0.75rem;
            color: ${theme.colors.lightText};
        }

        .input-container { margin: 0; }

        .error-message { display: none; }

        .input-field {
            box-shadow: none;
            border-radius: 2rem;

            :hover,
            :focus { 
                background: transparent;
            }

            ::after {
                content: none;
            }
        }

        .select-btn {
            background: ${theme.colors.white};
            border: 1px solid ${theme.colors.midGrey};
            border-radius: 1.25rem;
            transition: border-color .2s;
        }

        .select-btn:focus,
        .select-btn:hover,
        .select-btn[aria-expanded="true"] {
            border-color: ${theme.colors.darkGrey};
        }

        .select-btn[aria-expanded="true"] {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .value-container {
            font-size: 0.875rem;
        }

        .inner-btn-container {
            padding: 0 0.5rem;
        }

        .select-menu {
            box-shadow: none;
            border: 1px solid ${theme.colors.darkGrey};
            top: 100%;
            border-top-width: 0;
            border-radius: 0 0 1.25rem 1.25rem;
        }

        .placeholder {
            color: ${theme.colors.lightText};
            font-weight: 400;
        }
    `}
`;

export const LoadMoreButton = styled.button`
  padding: 1rem;
  width: 100%;
  outline: none;
  font-family: 'Roboto';
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;

  .react-icon {
    margin-right: 0.5rem;
    stroke-width: 3;
  }

  ${({ theme }) => `
        background: ${theme.colors.lightColor1};
        color: ${theme.colors.lightText};
        border: solid ${theme.colors.midGrey};
        border-width: 1px 0 0 0;

        :hover,
        :focus {
            color: ${theme.colors.primary};
        }
    `}
`;
