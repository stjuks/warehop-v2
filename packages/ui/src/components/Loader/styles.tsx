import styled from '../../util/styled';

interface IInputContainerProps {
    value?: any;
    isFocused?: boolean;
}

export const LoaderContainer = styled.div`
    ${({ theme }) => `
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .loader-text {
            font-weight: 500;
            color: ${theme.colors.primary};
        }

        .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
        }
        .lds-ellipsis div {
            box-shadow: ${theme.blueShadow};
            position: absolute;
            top: 27px;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: ${theme.colors.primary};
            animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
            left: 6px;
            animation: lds-ellipsis1 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
            left: 6px;
            animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
            left: 26px;
            animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
            left: 45px;
            animation: lds-ellipsis3 0.6s infinite;
        }
        @keyframes lds-ellipsis1 {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes lds-ellipsis3 {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(0);
            }
        }
        @keyframes lds-ellipsis2 {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(19px, 0);
            }
        }
    `}
`;
