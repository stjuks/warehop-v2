import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';

const spin = keyframes`
    0% { transform: rotate(0deg); }

    100% { transform: rotate(360deg); }
`;

const Loader = styled(FiLoader)`
    animation: 1s ${spin} infinite;
`;

export default Loader;
