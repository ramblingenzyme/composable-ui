import React, { useEffect, useState } from "react";

import ComponentChrome from "./components/ComponentChrome"
import Renderer from "./Renderer";
import { useStore }  from "../state";
import useDispatch from "./hooks/useDispatch";
import useListen from "./hooks/useListen";
import useStorage from "./hooks/useStorage";
import { toComponent } from "./utils";

function ComponentRenderer({ id, scope }) {
    const component = useStore(state => state.components[id]);

    const [Component, setComponent] = useState();

    useEffect(() => {
        if (component && scope) {
            const fn = toComponent(component.name, component.src, scope)
            setComponent(() => fn);
        }
    }, [component, scope]);

    if (!Component) {
        return <ComponentChrome name={component.name} />;
    }

    return (
        <ComponentChrome name={component.name}>
            <Renderer>
                <Component />
            </Renderer>
        </ComponentChrome>
    )
}

export default function AppsRenderer(props) {
    const [components, application] = useStore(state => [
        Object.keys(state.components),
        state.selectedApplication
    ]);

    const [scope, setScope] = useState();

    useEffect(() => {
        setScope({
            useDispatch: useDispatch(application),
            useListen: useListen(application),
            useStorage: useStorage(application),
        })
    }, [application]);

    const elements = components.map(id => (
        <ComponentRenderer key={id} id={id} scope={scope} />
    ));

    return (
        <div className="components">
            {elements}
        </div>
    )
}
