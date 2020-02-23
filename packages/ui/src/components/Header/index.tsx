import React, { useContext } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { HeaderContainer, IconsContainer, TitleContainer } from './styles';
import { observer } from 'mobx-react-lite';
import UIStoreContext from '@ui/stores/UIStore';

interface HeaderProps {
  title: string;
  backTo?: string | boolean;
  components?: React.ReactElement[];
}

const Header: React.FC<HeaderProps> = observer(({ title, components, backTo }) => {
  const uiStore = useContext(UIStoreContext);

  let titleComponent = (
    <>
      {backTo && (
        <span className="icon-container">
          <FiChevronLeft className="icon" />
        </span>
      )}
      {title}
    </>
  );

  const backRoute = typeof backTo === 'string' ? backTo : undefined;

  if (backTo) {
    titleComponent = (
      <button onClick={() => uiStore.goBack(backRoute)} className="back-button">
        {titleComponent}
      </button>
    );
  }

  return (
    <HeaderContainer>
      <TitleContainer>{titleComponent}</TitleContainer>
      <IconsContainer>
        {components &&
          components.map((component, i) => <React.Fragment key={i}>{component}</React.Fragment>)}
      </IconsContainer>
    </HeaderContainer>
  );
});

export default Header;
