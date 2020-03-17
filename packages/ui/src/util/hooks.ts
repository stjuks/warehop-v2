import { useEffect, useRef, useState } from 'react';

export function useDebounce<A extends any[]>(callback: (...args: A) => void, wait: number) {
  // track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
}

export const useLocalSetting = (defaultValue: any, settingName: string) => {
  const [setting, setSetting] = useState(defaultValue);

  const settings = JSON.parse(localStorage.getItem('settings') || '{}');

  useEffect(() => {

    if (settings[settingName]) {
      setSetting(settings[settingName]);
    } else {
      settings[settingName] = defaultValue;
      localStorage.setItem('settings', JSON.stringify(settings));
    }

    console.log(settings);

  }, [setting]);

  if (settings[settingName]) {
    return [settings[settingName], setSetting];
  }

  return [setting, setSetting];
};
