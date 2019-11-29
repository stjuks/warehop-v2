import React from 'react';
import { Link } from 'react-router-dom';

import { FooterItemContainer, IconContainer, LabelContainer } from './styles';

export interface IFooterItemProps {
    icon: React.ReactElement;
    label?: string;
    isActive?: boolean;
    onClick?: (event?: React.MouseEvent<HTMLElement>) => any;
    to?: string;
}

function FooterItem({ icon, label, isActive, onClick, to }: IFooterItemProps) {
    const ItemComponent = () => (
        <>
            <IconContainer>{icon}</IconContainer>
            {label && <LabelContainer isActive={isActive}>{label}</LabelContainer>}
        </>
    );

    return (
        <FooterItemContainer>
            {to ? (
                <Link to={to}>
                    <ItemComponent />
                </Link>
            ) : (
                <button type="button" onClick={onClick}>
                    <ItemComponent />
                </button>
            )}
        </FooterItemContainer>
    );
}

export default FooterItem;
