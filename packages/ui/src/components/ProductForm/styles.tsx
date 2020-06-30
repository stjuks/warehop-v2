import styled, { css } from 'styled-components';
import theme from '@ui/styles/theme';
import ContentContainer from '../util/ContentContainer';

interface IFormRowContainerProps {
  flex?: number[];
}

export const ProductFormContainer = styled(ContentContainer)`
  .form-subtitle {
    padding: 0.25rem 1rem;
    text-transform: uppercase;
    box-shadow: inset 2px 0 0 ${theme.colors.primary.rgb()};
    color: ${theme.colors.text.rgb()};
    font-family: ${theme.fonts.secondary};
    font-size: 0.875rem;
    font-weight: 500;
    margin: 1rem 0 1rem 0;
  }
`;

export const WarehouseFieldsContainer = styled.div`
  .warehouse-row {
    display: flex;

    .warehouse-select {
      flex: 1;
    }

    .warehouse-quantity-input {
      width: 7rem;
    }
  }
`;

const createFlex = (flex: number[]) => {
  let styles = '';

  flex.forEach(
    (f, i) =>
      (styles += `
        > :nth-child(${i + 1}) {
            flex: ${f};
        }
    `)
  );

  return css`
    ${styles}
  `;
};

export const FormRowContainer = styled.div<IFormRowContainerProps>`
  display: flex;

  > * {
    min-width: 0;

    :not(:last-child) {
      padding-right: 0.5rem;
    }

    :not(:first-child) {
      padding-left: 0.5rem;
    }
  }

  ${({ flex = [1, 1] }) => createFlex(flex)}
`;

export const AddWarehouseButton = styled.button`
  padding: 0.5rem;
  border-radius: 2rem;
  font-weight: 500;
  border: 1px solid ${theme.colors.primary.rgb()};
  width: 100%;
  color: ${theme.colors.primary.rgb()};
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover,
  :focus {
    background: ${theme.colors.lightColor1.rgb()};
    outline: none;
  }
`;

export const TrashButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  && {
    padding: 0;
    padding-bottom: 2.375rem;
  }

  button {
    color: ${theme.colors.lightText.rgb()};
  }
`;
