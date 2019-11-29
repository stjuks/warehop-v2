import { useEffect } from 'react';

export const useDebounce = (fn: Function, opts: { delay?: number; deps?: Array<any> }) => {
    useEffect(() => {
        const timeout = setTimeout(() => fn(), opts.delay || 300);

        return () => clearTimeout(timeout);
    }, opts.deps);
};
