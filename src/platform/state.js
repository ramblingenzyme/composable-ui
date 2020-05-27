import memoize from "lodash/memoize";
import { atom, selector } from "recoil";
import { v4 as uuid } from "uuid";

import { getAllKeys, getItem } from "./storage.js";
import { toComponent } from "./utils"

const DEFAULT_UUID = uuid();

export const componentStateFamily = memoize((id) => atom({
    key: `user-component-${id}`,
    default: {
        name: `New component (${id})`,
        src: "",
        fn: null,
    },
}));

export const componentIdsState = atom({
    key: "user-component-ids",
    default: [DEFAULT_UUID],
});

export const selectedIdState = atom({
    key: "selected-id",
    default: DEFAULT_UUID,
})

export const selectComponentOptions = selector({
    key: "component-options",
    get: ({ get }) => {
        const ids = get(componentIdsState);
        return ids.map(id => ({
            id,
            name: get(componentStateFamily(id)).name,
        }))
    }
})

export const initializeState = ({ set }) => {
    const keys = getAllKeys();
    if (!keys.length) {
        return;
    }

    set(componentIdsState, keys);
    set(selectedIdState, keys[0]);

    try {
    keys.forEach(key => {
        const value = getItem(key);
        const parsed = JSON.parse(value);
        try {
            const fn = toComponent(parsed.name, parsed.src);
            set(componentStateFamily(key), {
                ...parsed,
                fn,
            });
        } catch(e) {
            set(componentStateFamily(key), parsed);
        }
    })
    } catch(e) {
        console.error("Failed to initialise state");
    }
}
