export const debounce = (fn) => {
    let id;
    function wrapper(...args) {
        clearTimeout(id);
        id = setTimeout(() => fn.apply(this, args), 400);
    }
    return wrapper
}