import { v4 as uuid } from "uuid";
import create from 'zustand';
import { persist } from 'zustand/middleware';
import localForage from 'localforage';

import { escapeFnName, toComponent } from "./utils"

const DEFAULT_UUID = uuid();

const removeKey = (obj, key) => {
    const clone = {...obj};
    delete clone[id];
    return clone;
}

const initialState = (set, get) => ({
    components: {
        [DEFAULT_UUID]: { src: '', name: "New Component" }
     },
    functions: { },
    selectedComponent: DEFAULT_UUID,
    setComponent: (id, component) => set(state => ({ 
        components: {
            ...state.components,
            [id]: component
        },
        functions: {
            ...state.functions,
            [id]: component ? toComponent(component.name, component.src) : undefined
        }
    })),
    setSelectedComponent: componentId => set({ selectedComponent: componentId }),
    removeComponent: id => set(state => {
        const components = removeKey(state.components, id);
        return {
            components,
            functions: removeKey(state.functions, id),
            selectedComponent: (id === state.selectedComponent) 
                ? Object.keys(components)[0] || null
                : state.selectedComponent
        }
    })
})

export const useStore = create(persist(
    initialState,
    {
        name: 'composable-ui',
        getStorage: () => localForage,
        blacklist: ["functions"],
    } 
));

useStore.subscribe(console.log)