import React from "react";

import { useStore } from "./state";

export default function ComponentSelector () {
    const [selectedId, setSelectedId] = useStore(state => [state.selectedComponent, state.setSelectedComponent]);

    const componentOptions = useStore(state => Object
        .entries(state.components)
        .map(([id, component]) => ({
            id,
            name: component?.name
        }))
     );

    const onSelect = (e) => setSelectedId(e.target.value);

    return (
        <select name="components" onChange={onSelect} value={selectedId}>
            {componentOptions.map(({ id, name}) => (
                <option
                    key={id}
                    value={id}
                >
                    {name}
                </option>
            ))}
        </select>
    );
}
