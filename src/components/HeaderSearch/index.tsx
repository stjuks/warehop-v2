import React, { useState, createRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { HeaderSearchContainer, InputContainer, IconContainer } from './styles';
import { useDebounce } from '../../util/hooks';

interface IHeaderSearchProps {
    onChange(value: string): void;
}

function HeaderSearch({ onChange }: IHeaderSearchProps) {
    const [isOpened, setOpened] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const input = createRef<HTMLInputElement>();

    const handleChange = e => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const handleButton = () => {
        setOpened(!isOpened);

        if (!isOpened && input.current) {
            input.current.focus();
        } else {
            setValue('');
        }
    };

    useDebounce(() => {
        onChange(value);
    });

    return (
        <HeaderSearchContainer>
            <InputContainer isOpened={isOpened || isFocused}>
                <input
                    value={value}
                    className="search-input"
                    placeholder="Otsi kaupa"
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
