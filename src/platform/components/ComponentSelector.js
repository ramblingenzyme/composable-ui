import React from "react";
import { map } from "lodash/fp";

import { useStore } from "../../state";

export default function ComponentSelector () {
    const [selectedId, setSelectedId] = useStore(state => [state.selectedComponent, state.setSelectedComponent]);

    const componentOptions = useStore(store => map(
        (component, id) => ({
            id,
            name: component?.name
        }),
        store.components
    ));

    const onSelect = (e) => setSelectedId(e.target.value);

    return (
        <select name="components" onChange={onSelect} value={selectedId}>
            {map(({ id, name }) => (
                <option
                    key={id}
                    value={id}
                >
                    {name}
                </option>
            ), componentOptions)}
        </select>
    );
}
