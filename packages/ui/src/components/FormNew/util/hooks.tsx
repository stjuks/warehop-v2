import { useEffect, useRef } from 'react';

export const useEffectAfterMount = (cb: () => void, deps: any[]) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      cb();
    } else {
      isMounted.current = true;
    }
  }, deps);
};
