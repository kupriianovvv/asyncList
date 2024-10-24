/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(func: (...args: any) => void, ms: number) {
  let timeout: number;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), ms);
  };
}
