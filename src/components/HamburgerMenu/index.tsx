import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { FiMenu } from 'react-icons/fi';

import { MenuContainer, BackgroundContainer } from './styles';

function HamburgerMenu() {
    const [isOpen, setOpen] = useState(false);
    const bgTransitionName = 'bg-fade';
    const menuTransitionName = 'menu-slide';

    return (
        <>
            <button type="button" onClick={() => setOpen(!isOpen)}>
                <FiMenu />
            </button>
            <CSSTransition in={isOpen} timeout={0} classNames={bgTransitionName}>
                <BackgroundContainer transitionName={bgTransitionName} onClick={() => setOpen(false)} />
            </CSSTransition>
            <CSSTransition in={isOpen} timeout={0} classNames={menuTransitionName}>
                <MenuContainer transitionName={menuTransitionName}></MenuContainer>
            </CSSTransition>
        </>
    );
}

export default HamburgerMenu;
