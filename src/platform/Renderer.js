import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import ComponentEditor from "./ComponentEditor.js";
import ComponentRenderer from "./ComponentRenderer";
import { componentIdsState, selectedIdState, selectComponentOptions } from "./state";

function ComponentSelector () {
    const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
    const componentOptions = useRecoilValue(selectComponentOptions);
    const onSelect = (e) => setSelectedId(e.target.value);

    return (
        <select name="components" onChange={onSelect}>
            {componentOptions.map(({ id, name}) => (
                <option
                    value={id}
                    selected={id === selectedId}
                >
                    {name}
                </option>
            ))}
        </select>
    );
}

export default function Renderer (props) {
    const [componentIds, setComponentIds] = useRecoilState(componentIdsState);
    const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

    const elements = componentIds.map(id => (
        <ComponentRenderer key={id} id={id} />
    ));

    const addNew = () => {
        const newId = uuid();
        setComponentIds([...componentIds, newId])
        setSelectedId(newId);
    }

    return (
        <>
            <div>
                <ComponentSelector />
                <ComponentEditor
                    key={selectedId} // this is a fucking hack
                    selectedId={selectedId}
                    addNew={addNew}
                />
            </div>
            <div>
                {elements}
            </div>
        </>
    )
}
