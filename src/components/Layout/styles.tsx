import styled, { css } from 'styled-components';

interface RowProps {
    flex?: number[];
}

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

export const Row = styled.div<RowProps>`
    ${({ flex = [1] }) => `
        display: flex;
        ${createFlex(flex)}
    `}
`;
