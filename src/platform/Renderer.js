import React from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import ComponentRenderer from "./ComponentRenderer";
import { componentIdsState } from "./state";

export default function Renderer (props) {
    const componentIds = useRecoilValue(componentIdsState);

    const elements = componentIds.map(id => (
        <ComponentRenderer key={id} id={id} />
    ));

    return (
        <div className="components">
            {elements}
        </div>
    )
}
