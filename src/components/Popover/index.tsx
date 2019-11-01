import React, { useEffect, useState, ReactElement } from 'react';
import ReactTinyPopover from 'react-tiny-popover';

import { ContentContainer, MenuItemContainer } from './styles';

interface IBasePopoverProps {
    position: any;
    children: any;
    closeContentOnClick?: boolean;
}

interface IPopoverProps extends IBasePopoverProps {
    content: any;
}

function Popover({
    children,
    position,
    content,
    closeContentOnClick = false
}: IPopoverProps) {
    const [isOpen, setIsOpen] = useState(false);

    const contentClosesOnClick = (
        <div onClick={() => setIsOpen(false)}>{content}</div>
    );

    return (
        <ReactTinyPopover
            isOpen={isOpen}
            position={position}
            content={closeContentOnClick ? contentClosesOnClick : content}
            align="end"
            containerStyle={{ overflow: 'visible' }}
            onClickOutside={() => setIsOpen(false)}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'inherit'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {children}
            </div>
        </ReactTinyPopover>
    );
}

interface IMenuPopoverProps extends IBasePopoverProps {
    options: {
        label: string | ReactElement;
        onClick: () => void;
    }[];
}

export function MenuPopover({
    options,
    children,
    ...restProps
}: IMenuPopoverProps) {
    const Content = (
        <ContentContainer>
            {options.map((option, i) => (
                <MenuItemContainer onClick={option.onClick} key={i}>
                    {option.label}
                </MenuItemContainer>
            ))}
        </ContentContainer>
    );

    return (
        <Popover {...restProps} content={Content}>
            {children}
        </Popover>
    );
}

export default Popover;
