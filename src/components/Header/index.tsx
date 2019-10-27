import React, { useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import {
    HeaderContainer,
    IconsContainer,
    IconContainer,
    TitleContainer
} from './styles';

interface IHeaderProps {
    title: string;
    withBackButton?: boolean;
    onBackButtonClick?: Function;
    icons?: {
        icon: React.ReactElement;
        size?: string;
        onClick: any;
        highlighted?: boolean;
    }[];
}

function Header(props) {
    const { title, icons, withBackButton = false }: IHeaderProps = props;

    return (
        <HeaderContainer>
            <TitleContainer>
                {/* withBackButton && (
                    <a className="back-button">
                        <FiChevronLeft />
                    </a>
                )*/}
                {title}
            </TitleContainer>
            <IconsContainer>
                {icons &&
                    icons.map(({ icon, size, highlighted, onClick }, i) => (
                        <IconContainer
                            size={size}
                            highlighted={highlighted}
                            onClick={onClick}
                            key={i}
                        >
                            {icon}
                        </IconContainer>
                    ))}
            </IconsContainer>
        </HeaderContainer>
    );
}

export default Header;
