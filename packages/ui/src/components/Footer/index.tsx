import React, { useContext } from 'react';
import { FaBoxes, FaShoppingBasket, FaMoneyCheck } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
import { RouteProps, matchPath } from 'react-router';

import FooterItem, { IFooterItemProps } from './FooterItem';

import routes from '@ui/util/routes';
import { FooterContainer } from './styles';
import UIStoreContext from '@ui/stores/UIStore';

export const Footer = withRouter(
    observer((props: React.PropsWithChildren<any> & RouteProps) => {
        const uiStore = useContext(UIStoreContext);

        const footerItems: IFooterItemProps[] = [
            { label: 'Kaubad', icon: <FaBoxes />, to: routes.products },
            { label: 'Ost', icon: <FaShoppingBasket />, to: routes.purchases },
            { label: 'Müük', icon: <FaMoneyCheck />, to: routes.sales },
            { icon: <FiMenu />, onClick: () => uiStore.setHamburgerMenuOpen(true) }
        ];

        const footerlessRoutes = [routes.ProductForm, routes.purchaseForm, '/formExample'];

        if (footerlessRoutes.find(route => matchPath(props.location.pathname, route))) return null;

        return (
            <>
                <FooterContainer>
                    {footerItems.map((item, i) => (
                        <FooterItem {...item} key={i} />
                    ))}
                </FooterContainer>
            </>
        );
    })
);

export default Footer;
