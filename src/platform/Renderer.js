import React from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import ComponentEditor from "./ComponentEditor.js";
import ComponentRenderer from "./ComponentRenderer";
import { componentIdsState, selectedIdState } from "./state";

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
            <ComponentEditor
                key={selectedId} // this is a fucking hack
                selectedId={selectedId}
                addNew={addNew}
            />
            <div className="components">
                {elements}
            </div>
        </>
    )
}
