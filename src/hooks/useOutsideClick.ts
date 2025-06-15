import { useEffect, RefObject, useCallback } from 'react';

export function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, callback: (event: MouseEvent) => void) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      // for preventing popover close when user selects some text inside popover
      const isUserSelectsText = window.getSelection()!.type === 'Range';

      if (ref?.current && !ref.current.contains(event.target as Node) && !isUserSelectsText) {
        callback(event);
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [handleClick]);
}
