import { useEffect, useRef } from "react";

export const useInterval = (callback: any, delay: number) => {
    const saveCallback = useRef();
    useEffect(() => {
        saveCallback.current = callback;
      }, [callback]);

    useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        saveCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
