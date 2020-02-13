import React, { useState, createRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { HeaderSearchContainer, InputContainer, IconContainer } from './styles';
import { useDebounce } from 'react-use';

interface IHeaderSearchProps {
  onChange(value: string): void;
  placeholder?: string;
}

function HeaderSearch({ onChange, placeholder }: IHeaderSearchProps) {
  const [isOpened, setOpened] = useState(false);
  const [query, setQuery] = useState('');

  const input = createRef<HTMLInputElement>();

  const handleChange = e => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

  const handleButton = () => {
    setOpened(!isOpened);

    if (!isOpened && input.current) {
      input.current.focus();
    } else {
      setQuery('');
    }
  };

  useDebounce(
    () => {
      onChange(query);
    },
    500,
    [query]
  );

  useEffect(() => {
    const handleKeyDown = e => {
      // if ESC
      if (e.keyCode === 27) {
        setOpened(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <HeaderSearchContainer>
      <InputContainer isOpened={isOpened}>
        <input
          value={query}
          className="search-input"
          placeholder={placeholder}
          onChange={handleChange}
          ref={input}
        />
      </InputContainer>
      <IconContainer type="button" onClick={handleButton}>
        <FiSearch />
      </IconContainer>
    </HeaderSearchContainer>
  );
}

export default HeaderSearch;
