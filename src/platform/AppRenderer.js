import React from "react";

import ComponentChrome from "./components/ComponentChrome"
import Renderer from "./Renderer";
import { useStore }  from "../state";

function AppRenderer({ id }) {
    const [Application, name] = useStore(state => [
        state.functions[id],
        state.components[id]?.name,
    ])

    return (
        <ComponentChrome name={name}>
            <Renderer>
                <Application />
            </Renderer>
        </ComponentChrome>
    )
}

export default function AppsRenderer(props) {
    const appIds = useStore(state => Object.keys(state.components));

    const elements = appIds.map(id => (
        <AppRenderer key={id} id={id} />
    ));

    return (
        <div className="components">
            {elements}
        </div>
    )
}
