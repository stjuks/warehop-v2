import React from 'react';
import { FaBoxes } from 'react-icons/fa';

import { HeaderContainer } from './styles';

interface IHeaderProps {
    title: string;
}

function Header({ title }: IHeaderProps) {
    return (
        <HeaderContainer>
            {title}
        </HeaderContainer>
    );
}

export default Header;
