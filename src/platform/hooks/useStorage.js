import { useEffect, useState } from "react";
import localForage from "localforage";

const useStorage = (id = "default") => {
    const appStorage = localForage.createInstance({
        name: id
    });

    return (key, init) => {
        const [state, setState] = useState();

        useEffect(() => {
            const initFn = async () => {
                const storedValue = await appStorage.getItem(key);

                if (!storedValue) {
                    const val = (typeof init === "function") ? init() : init;
                    await appStorage.setItem(key, val);
                    setState(val);
                } else {
                    setState(storedValue);
                }
            };
            initFn();
        }, []);

        const update = (updated) => {
            appStorage.setItem(key, updated);
            setState(updated);
        };

        return [state, update];
    };
}

export default useStorage;