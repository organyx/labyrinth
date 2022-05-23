import { useEffect, useRef } from 'react';

const useEventListener = (eventName, handler, element) => {
  if (typeof window !== 'undefined' && !element) {
    element = window;
  }

  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = event => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
