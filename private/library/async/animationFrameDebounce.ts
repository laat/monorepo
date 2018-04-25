/**
 * Debounce function, based on requestAnimationFrame.
 * fallback: 15fps when requestAnimationFrame does not exist
 *
 * based on https://developer.mozilla.org/en-US/docs/Web/Events/resize
 * @param fn function to debounce
 */
export default function animationFrameDebounce<T extends (...args: any[]) => void>(fn: T) {
  let running = false;

  // TODO(laat): fix any[] type.
  return (...args: any[]) => {
    if (running) {
      return;
    }
    const callback = () => {
      fn(...args);
      running = false;
    };
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(callback);
    } else {
      // IE9
      setTimeout(callback, 66); // 66 = 15fps
    }
  };
}
