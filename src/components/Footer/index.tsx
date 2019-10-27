import React from 'react';
import { FaBoxes, FaShoppingBasket, FaMoneyCheck } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

import FooterItem, { IFooterItemProps } from './FooterItem';

import { FooterContainer } from './styles';

function Footer() {
    const footerItems: IFooterItemProps[] = [
        { label: 'Kaubad', icon: <FaBoxes />, isActive: true, to: '/products' },
        { label: 'Ost', icon: <FaShoppingBasket />, isActive: false, to: '/purchases' },
        { label: 'Müük', icon: <FaMoneyCheck />, isActive: false, to: 'sales' },
        { icon: <FiMenu />, isActive: false, to: '' }
    ];

    return (
        <FooterContainer>
            {footerItems.map((item, i) => (
                <FooterItem  {...item} key={i} />
            ))}
        </FooterContainer>
    );
}

export default Footer;
