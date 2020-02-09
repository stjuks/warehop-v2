import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { MainListItemContainer } from './styles';

interface MainListItemProps {
  to?: any;
  className?: string;
}

const MainListItem: React.FC<MainListItemProps> = ({ children, to, className }) => {
  return (
    <MainListItemContainer to={to} className={className}>
      {children}
      <div className="col-2">
        <FiChevronRight />
      </div>
    </MainListItemContainer>
  );
};

export default MainListItem;
