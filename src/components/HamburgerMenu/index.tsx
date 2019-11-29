import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';
import {
    FaBoxes,
    FaShoppingBasket,
    FaMoneyCheck,
    FaWallet,
    FaPiggyBank,
    FaHandshake,
    FaChartLine,
    FaCog
} from 'react-icons/fa';

import { MenuContainer, BackgroundContainer } from './styles';
import routes from '../../common/routes';
import MenuItem, { IMenuItemProps } from './MenuItem';
import { UIStoreContext } from '../../stores/UIStore';

const HamburgerMenu = observer(() => {
    const uiStore = useContext(UIStoreContext);
    const bgTransitionName = 'bg-fade';
    const menuTransitionName = 'menu-slide';

    const menuItems: IMenuItemProps[][] = [
        [
            {
                label: 'Kaubad',
                icon: <FaBoxes />,
                to: routes.products
            },
            {
                label: 'Ost',
                icon: <FaShoppingBasket />,
                to: routes.purchases
            },
            {
                label: 'Müük',
                icon: <FaMoneyCheck />,
                to: routes.sales
            }
        ],
        [
            {
                label: 'Kulud',
                icon: <FaWallet />,
                to: routes.expenses
            },
            {
                label: 'Tulud',
                icon: <FaPiggyBank />,
                to: routes.incomes
            },
            {
                label: 'Partnerid',
                icon: <FaHandshake />,
                to: routes.partners
            },
            {
                label: 'Statistika',
                icon: <FaChartLine />,
                to: routes.statistics
            }
        ],
        [
            {
                label: 'Sätted',
                icon: <FaCog />,
                to: routes.settings
            }
        ]
    ];

    return (
        <>
            <CSSTransition in={uiStore.isHamburgerMenuOpen} timeout={0} classNames={bgTransitionName}>
                <BackgroundContainer
                    transitionName={bgTransitionName}
                    onClick={() => uiStore.setHamburgerMenuOpen(false)}
                />
            </CSSTransition>
            <CSSTransition in={uiStore.isHamburgerMenuOpen} timeout={0} classNames={menuTransitionName}>
                <MenuContainer transitionName={menuTransitionName}>
                    {menuItems.map((subItems, i) => {
                        return (
                            <React.Fragment key={i}>
                                {subItems.map(item => (
                                    <MenuItem
                                        {...item}
                                        key={item.label}
                                        onClick={() => uiStore.setHamburgerMenuOpen(false)}
                                    />
                                ))}
                                {i + 1 !== menuItems.length && <div className="divider" />}
                            </React.Fragment>
                        );
                    })}
                </MenuContainer>
            </CSSTransition>
        </>
    );
});

export default HamburgerMenu;
