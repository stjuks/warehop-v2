import React, { useContext } from 'react';
import { FaBoxes, FaShoppingBasket, FaMoneyCheck } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import FooterItem, { IFooterItemProps } from './FooterItem';

import routes from '../../common/routes';
import { FooterContainer } from './styles';
import HamburgerMenu from '../HamburgerMenu';
import { UIStoreContext } from '../../stores/UIStore';

export const Footer = observer(() => {
    const uiStore = useContext(UIStoreContext);

    const footerItems: IFooterItemProps[] = [
        { label: 'Kaubad', icon: <FaBoxes />, isActive: true, to: routes.products },
        { label: 'Ost', icon: <FaShoppingBasket />, isActive: false, to: routes.purchases },
        { label: 'Müük', icon: <FaMoneyCheck />, isActive: false, to: routes.sales },
        { icon: <FiMenu />, isActive: false, onClick: () => uiStore.setHamburgerMenuOpen(true) }
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
});

export default Footer;
