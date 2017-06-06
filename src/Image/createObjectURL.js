export default (file) => {
  if (typeof window !== 'undefined'
    && typeof window.URL !== 'undefined'
    && typeof window.URL.createObjectURL === 'function') {
    return window.URL.createObjectURL(file);
  }
  return undefined;
};
