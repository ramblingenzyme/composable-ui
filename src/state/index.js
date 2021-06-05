import { v4 as uuid } from "uuid";
import create from 'zustand';
import { persist } from 'zustand/middleware';
import localForage from 'localforage';

import ACTIONS from "./actions";

const DEFAULT_APPLICATION_UUID = uuid();
const DEFAULT_COMPONENT_UUID = uuid();

const map = fn => arr => arr.map(fn);
const mapValues = fn => map(([key, val]) => [key, fn(val, key)]);
const mapKeys = fn => map(([key,val]) => [fn(val, key), val]);

const objectMap = (fn, obj) => obj
    |> Object.entries
    |> mapValues(fn)
    |> Object.fromEntries;

const getActions = (actions, set, get) => objectMap((fn, key) => fn(set, get), actions);

const initialState = (set, get) => ({
    applications: {
        [DEFAULT_APPLICATION_UUID]: { name: "New Application", components: [DEFAULT_APPLICATION_UUID] }
    },
    components: {
        [DEFAULT_COMPONENT_UUID]: { src: '', name: "New Component" }
     },
    functions: { },
    selectedApplication: DEFAULT_APPLICATION_UUID,
    selectedComponent: DEFAULT_COMPONENT_UUID,
    ...getActions(ACTIONS, set, get),
});

const persistConfig = {
    name: 'composable-ui',
    getStorage: () => localForage,
    blacklist: ["functions"],
}

export const useStore = initialState
    |> (_ => persist(_, persistConfig))
    |> create;

useStore.subscribe(console.log)