import { toComponent } from "../platform/utils"

const removeKey = (obj, key) => {
    const clone = {...obj};
    delete clone[id];
    return clone;
}

const DEFAULT_COMPONENT = {
    name: "New Component",
    src: '',
}

const setComponent = set => (id, component = DEFAULT_COMPONENT) => set(state => ({
    components: {
        ...state.components,
        [id]: component
    },
    functions: {
        ...state.functions,
        [id]: component ? toComponent(component.name, component.src) : undefined
    }
}));

const setSelectedComponent = set => componentId => set({ selectedComponent: componentId });

const removeComponent = set => id => set(state => {
    const components = removeKey(state.components, id);
    return {
        components,
        functions: removeKey(state.functions, id),
        selectedComponent: (id === state.selectedComponent) 
            ? Object.keys(components)[0] || null
            : state.selectedComponent
    }
});

const actions = {
    setComponent,
    setSelectedComponent,
    removeComponent,
}

export default actions;