import styled from '@ui/util/styled';

export const HeaderContainer = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.white};
    color: ${theme.colors.text};
    box-shadow: ${theme.lightShadow};
    
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
  `}
`;

export const TitleContainer = styled.div`
  display: flex;

  .back-button {
    min-width: 1.5rem;
    display: flex;
    align-items: center;
    font-family: 'Red Hat Display', sans-serif !important;
    font-weight: 500;

    .icon-container {
      display: flex;
      align-items: center;
      width: 1.5rem;
    }
  }
`;

export const IconsContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    z-index: 3;
    flex: 1;
    justify-content: flex-end;
    font-size: 1.75rem;
    margin-left: 0.75rem;
    color: ${theme.colors.text};
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
        background: ${theme.colors.primary};
        transform: translateX(-50%);
        left: 50%;
        top: calc(100% + 2px);
        border-radius: 50%;
        z-index: -1;
      }
    }
  `}
`;
