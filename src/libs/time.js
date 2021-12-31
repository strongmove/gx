import React from "react";

export function useControlledInterval(interval) {
  const handleRef = React.useRef();
  function start(callback) {
    clearInterval(handleRef.current);
    handleRef.current = setInterval(callback, interval);
  }
  function stop() {
    clearInterval(handleRef.current);
  }
  return { start, stop };
}

export function useInterval(callback, interval) {
  React.useEffect(() => {
    callback();
    const h = setInterval(callback, interval);
    return () => clearInterval(h);
  }, [interval, callback]);
}
