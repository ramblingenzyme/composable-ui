import memoize from "lodash/memoize";
import { atom, selector } from "recoil";
import { v4 as uuid } from "uuid";

const DEFAULT_UUID = uuid();

export const componentStateFamily = memoize((id) => atom({
    key: `user-component-${id}`,
    default: {
        name: `New component (${id})`,
        src: "",
        fn: null,
    }
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
