import React from 'react';

import { ButtonContainer } from './styles';

function Button({ title, ...restProps }) {
    return (
        <ButtonContainer {...restProps}>
            {title}
        </ButtonContainer>
    );
}

export default Button;
