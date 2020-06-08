import memoize from "lodash/memoize";
import { atom, selector } from "recoil";
import { v4 as uuid } from "uuid";

import { escapeFnName } from "./utils"

const DEFAULT_UUID = uuid();

export const componentStateFamily = memoize((id) => atom({
    key: `user-component-${id}`,
    default: {
        name: `New component-${id}`,
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
});

export const selectComponentOptions = selector({
    key: "component-options",
    get: ({ get }) => {
        const ids = get(componentIdsState);
        return ids.map(id => ({
            id,
            name: get(componentStateFamily(id)).name,
        }))
    }
});

export const selectComponentScope = selector({
    key: "component-scope",
    get: ({ get }) => {
        const ids = get(componentIdsState);
        const components = ids.map(id => {
            const { name, fn } = get(componentStateFamily(id));
            return [escapeFnName(name), fn];
        });

        return Object.fromEntries(components);
    }
})

export const initializeState = ({ keys, components }) => ({ set }) => {
    set(componentIdsState, keys);
    set(selectedIdState, keys[0]);

    components.forEach(([key, component]) => set(
        componentStateFamily(key),
        component,
    ));
};
