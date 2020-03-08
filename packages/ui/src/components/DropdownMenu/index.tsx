import React from 'react';
import { DropdownMenuWrapper, MenuButton, DropdownMenuItem, DropdownMenuContainer } from './styles';

interface DropdownMenuProps {
  button: React.ReactElement;
  options: DropdownOption[];
}

interface DropdownOption {
  label: string | React.ReactElement;
  onClick: () => any;
  isDisabled?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ button, options }) => {
  const handleSelection = (option: DropdownOption) => {
    option.onClick();
  };

  return (
    <DropdownMenuWrapper onSelection={handleSelection}>
      <MenuButton>{button}</MenuButton>
      <DropdownMenuContainer>
        {options.map((option, i) => (
          <DropdownMenuItem key={i} value={option}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContainer>
    </DropdownMenuWrapper>
  );
};

export default DropdownMenu;
