import memoize from "lodash/memoize";
import { atom, selector } from "recoil";
import { v4 as uuid } from "uuid";

import { escapeFnName } from "./utils"

const DEFAULT_UUID = uuid();

const getFamily = (key, familyDefault = {}, idDefault = [], selectedDefault = idDefault[0]) => [
    memoize(id => atom({
        key: `${key}-${id}`,
        default: familyDefault,
    })),
    atom({
        key: `${key}-ids`,
        default: idDefault,
    }),
    atom({
        key: `${key}-selected`,
        default: selectedDefault,
    }),
];

export const [
    applicationStateFamily,
    applicationIdsState,
    selectedApplication,
] = getFamily("user-app", {
    name: "New app",
    src: "",
    fn: null,
});

export const [
    componentStateFamily,
    componentIdsState,
    selectedIdState,
] = getFamily("user-component", {
    name: "New component",
    src: "",
    fn: null,
}, [DEFAULT_UUID])

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
