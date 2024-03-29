import { v4 as uuid } from "uuid";
import create from "zustand";
import { persist } from "zustand/middleware";
import localForage from "localforage";
import { mapValues } from "lodash/fp";

import ACTIONS from "./actions";

const DEFAULT_APPLICATION_UUID = uuid();
const DEFAULT_COMPONENT_UUID = uuid();

const getActions = (actions, set, get) =>
  mapValues((fn, key) => fn(set, get), actions);

const initialState = (set, get) => ({
  applications: {
    [DEFAULT_APPLICATION_UUID]: {
      name: "New Application",
      components: [DEFAULT_APPLICATION_UUID],
    },
  },
  components: {
    [DEFAULT_COMPONENT_UUID]: { src: "", name: "New Component" },
  },
  css: "",
  functions: {},
  selectedApplication: DEFAULT_APPLICATION_UUID,
  selectedComponent: DEFAULT_COMPONENT_UUID,
  ...getActions(ACTIONS, set, get),
});

const persistConfig = {
  name: "composable-ui",
  getStorage: () => localForage,
  blacklist: ["functions"],
};

export const useStore = initialState |> persist(?, persistConfig) |> create;

useStore.subscribe(console.log);
