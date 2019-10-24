import React from 'react';

import { FooterItemContainer, IconContainer, LabelContainer } from './styles';

export interface IFooterItemProps {
    icon: React.ReactElement;
    label?: string;
    isActive?: boolean;
    onClick?: Function;
    href?: string;
}

function FooterItem({
    icon,
    label,
    isActive,
    onClick,
    href
}: IFooterItemProps) {
    return (
        <FooterItemContainer href={href} isActive={isActive}>
            <IconContainer>{icon}</IconContainer>
            {label && <LabelContainer>{label}</LabelContainer>}
        </FooterItemContainer>
    );
}

export default FooterItem;
