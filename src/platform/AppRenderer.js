import React from "react";
import { useRecoilValue } from "recoil";

import ComponentChrome from "./ComponentChrome"
import Renderer from "./Renderer";
import { componentStateFamily, componentIdsState } from "./state";

function AppRenderer({ id }) {
    const { fn: Application, name } = useRecoilValue(componentStateFamily(id))

    return (
        <ComponentChrome name={name}>
            <Renderer>
                <Application />
            </Renderer>
        </ComponentChrome>
    )
}

export default function AppsRenderer(props) {
    const appIds = useRecoilValue(componentIdsState);

    const elements = appIds.map(id => (
        <AppRenderer key={id} id={id} />
    ));

    return (
        <div className="components">
            {elements}
        </div>
    )
}
