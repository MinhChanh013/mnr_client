// Remove error "ResizeObserver loop completed with undelivered notifications."
export const removeErrorResizeObserver = () => {
  const debounce = (callback) => {
    let tid;
    return function (...args) {
      const ctx = "";
      tid && clearTimeout(tid);
      tid = setTimeout(() => {
        callback.apply(ctx, args);
      }, 0);
    };
  };

  const _ = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ {
    constructor(callback) {
      callback = debounce(callback, 20);
      super(callback);
    }
  };
};
