import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
    HeaderContainer,
    IconsContainer,
    IconContainer,
    TitleContainer
} from './styles';

interface IHeaderProps {
    title: string;
    backTo?: string;
    onBackButtonClick?: Function;
    icons?: {
        icon: React.ReactElement;
        size?: string;
        onClick: any;
        highlighted?: boolean;
        unfocusable?: boolean;
    }[];
}

function Header(props) {
    const { title, icons, backTo }: IHeaderProps = props;

    return (
        <HeaderContainer>
            <TitleContainer>
                {backTo ? (
                    <Link to={backTo} className="back-button">
                        <span className="icon-container">
                            <FiChevronLeft className="icon" />
                        </span>
                        {title}
                    </Link>
                ) : (
                    title
                )}
            </TitleContainer>
            <IconsContainer>
                {icons &&
                    icons.map(({ icon, size, highlighted, onClick, unfocusable }, i) => (
                        <IconContainer
                            size={size}
                            highlighted={highlighted}
                            onClick={onClick}
                            key={i}
                            tabIndex={1}
                        >
                            {icon}
                        </IconContainer>
                    ))}
            </IconsContainer>
        </HeaderContainer>
    );
}

export default Header;
