import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T):
[T, Dispatch<SetStateAction<T>>] => {
  const getValue = ():T => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return initialValue;
  };

  // eslint-disable-next-line no-console
  console.log(getValue());

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
