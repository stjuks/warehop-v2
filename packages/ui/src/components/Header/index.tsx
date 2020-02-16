import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { HeaderContainer, IconsContainer, TitleContainer } from './styles';

interface HeaderProps {
  title: string;
  backTo?: string;
  onBack?: () => any;
  components?: React.ReactElement[];
}

const Header: React.FC<HeaderProps> = ({ title, components, backTo, onBack }) => {
  let titleComponent = (
    <>
      {(onBack || backTo) && (
        <span className="icon-container">
          <FiChevronLeft className="icon" />
        </span>
      )}
      {title}
    </>
  );

  if (backTo) {
    titleComponent = (
      <Link to={backTo} className="back-button">
        {titleComponent}
      </Link>
    );
  }

  if (onBack) {
    titleComponent = (
      <button onClick={onBack} className="back-button">
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
};

export default Header;
