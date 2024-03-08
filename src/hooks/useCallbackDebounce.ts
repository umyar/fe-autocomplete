import { useRef, useEffect } from "react";

export function useDebouncedCallback<T extends Function>(callback: T, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current as number);
  }, []);

  // can we infer T arguments somehow?
  return (...args: unknown[]) => {
    clearTimeout(timeoutRef.current as number);

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
