import React from 'react';

import { FooterItemContainer, IconContainer, LabelContainer } from './styles';

export interface IFooterItemProps {
    icon: React.ReactElement;
    label?: string;
    isActive?: boolean;
    onClick?: Function;
    to?: string;
}

function FooterItem({ icon, label, isActive, onClick, to }: IFooterItemProps) {
    return (
        <FooterItemContainer to={to}>
            <IconContainer>{icon}</IconContainer>
            {label && <LabelContainer isActive={isActive}>{label}</LabelContainer>}
        </FooterItemContainer>
    );
}

export default FooterItem;
