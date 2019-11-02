import { useEffect, useState } from 'react';

export const useDebounce = (fn: Function, delay: number = 300) => {
    useEffect(() => {
        const timeout = setTimeout(() => fn(), delay);

        return () => clearTimeout(timeout);
    });
};
