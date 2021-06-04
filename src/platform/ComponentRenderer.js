import React from "react";

import ComponentChrome from "./ComponentChrome";
import Renderer from "./Renderer";
import { useStore } from "./state";

export default function ComponentRenderer({ id }) {
    const [Component, name, removeComponent] = useStore(state => [
        state.functions[id],
        state.components[id]?.name,
        state.removeComponent
    ])


    const [selectedId, setSelectedId] = useStore(state => [state.selectedComponent, state.setSelectedComponent]);

    if (!Component) {
        return null;
    }

    const remove = () => removeComponent(id);
    const select = () => setSelectedId(id);

    return (
        <ComponentChrome name={name} reset={remove} select={select}>
            <Renderer>
                <Component />
            </Renderer>
        </ComponentChrome>
    );
}

