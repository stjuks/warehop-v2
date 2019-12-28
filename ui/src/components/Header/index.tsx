import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { HeaderContainer, IconsContainer, IconContainer, TitleContainer } from './styles';

interface IHeaderProps {
    title: string;
    backTo?: string;
    onBackButtonClick?: Function;
    components?: React.Component[];
}

function Header(props) {
    const { title, components, backTo }: IHeaderProps = props;

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
                {components && components.map((component, i) => <React.Fragment key={i}>{component}</React.Fragment>)}
            </IconsContainer>
        </HeaderContainer>
    );
}

export default Header;
