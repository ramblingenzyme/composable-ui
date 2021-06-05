import { v4 as uuid } from "uuid";
import create from 'zustand';
import { persist } from 'zustand/middleware';
import localForage from 'localforage';

import ACTIONS from "./actions";

const DEFAULT_UUID = uuid();

const map = fn => arr => arr.map(fn);
const mapPairs = fn => map(([key, val]) => [key, fn(val, key)]);

const objectMap = (fn, obj) => obj
    |> Object.entries
    |> mapPairs(fn)
    |> Object.fromEntries;

const getActions = (actions, set, get) => objectMap((fn, key) => fn(set, get), actions);

const initialState = (set, get) => ({
    components: {
        [DEFAULT_UUID]: { src: '', name: "New Component" }
     },
    functions: { },
    selectedComponent: DEFAULT_UUID,
    ...getActions(ACTIONS, set, get),
});

export const useStore = create(persist(
    initialState,
    {
        name: 'composable-ui',
        getStorage: () => localForage,
        blacklist: ["functions"],
    } 
));

useStore.subscribe(console.log)