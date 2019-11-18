import React from 'react';
import { FaBoxes, FaShoppingBasket, FaMoneyCheck } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

import FooterItem, { IFooterItemProps } from './FooterItem';

import routes from '../../common/routes';
import { FooterContainer } from './styles';
import HamburgerMenu from '../HamburgerMenu';

function Footer() {
    const footerItems: IFooterItemProps[] = [
        { label: 'Kaubad', icon: <FaBoxes />, isActive: true, to: routes.products },
        { label: 'Ost', icon: <FaShoppingBasket />, isActive: false, to: routes.purchases },
        { label: 'Müük', icon: <FaMoneyCheck />, isActive: false, to: routes.sales },
        { icon: <HamburgerMenu />, isActive: false, to: '' }
    ];

    return (
        <>
            <FooterContainer>
                {footerItems.map((item, i) => (
                    <FooterItem {...item} key={i} />
                ))}
            </FooterContainer>
        </>
    );
}

export default Footer;
