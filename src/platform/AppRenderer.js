import React from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import ComponentRenderer from "./ComponentRenderer";
import Renderer from "./Renderer";
import { applicationStateFamily, applicationIdsState } from "./state";

function AppRenderer({ id }) {
    const { fn: Application } = useRecoilValue(applicationStateFamily(id))

    return (
        <Renderer>
            <Application />
        </Renderer>
    )
}

export default function AppsRenderer(props) {
    const appIds = useRecoilValue(applicationIdsState);

    const elements = appIds.map(id => (
        <AppRenderer key={id} id={id} />
    ));

    return (
        <div className="components">
            {elements}
        </div>
    )
}
