import React from 'react';
import { FaBoxes, FaShoppingBasket, FaMoneyCheck } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

import FooterItem, { IFooterItemProps } from './FooterItem';

import { FooterContainer } from './styles';

function Footer() {
    const footerItems: IFooterItemProps[] = [
        { label: 'Kaubad', icon: <FaBoxes />, isActive: true, href: 'index' },
        { label: 'Ost', icon: <FaShoppingBasket /> },
        { label: 'Müük', icon: <FaMoneyCheck /> },
        { icon: <FiMenu /> }
    ];

    return (
        <FooterContainer>
            {footerItems.map(item => (
                <FooterItem {...item} />
            ))}
        </FooterContainer>
    );
}

export default Footer;
