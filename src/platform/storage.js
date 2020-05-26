export const setItem = (key, val) => localStorage.setItem(key, val);
export const getItem = key => localStorage.getItem(key);
export const getAllKeys = () => Object.keys(localStorage);
export const removeItem = key => localStorage.removeItem(key);
