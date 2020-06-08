import localForage from "localforage";

const hostStorage = localForage.createInstance({
    name: "host",
});

export const setItem = (key, val) => hostStorage.setItem(key, val);
export const getItem = key => hostStorage.getItem(key);
export const getAllKeys = () => hostStorage.keys();
export const removeItem = key => hostStorage.removeItem(key);
