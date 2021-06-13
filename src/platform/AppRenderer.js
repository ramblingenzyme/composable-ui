import React, { useEffect, useState } from "react";
import { map } from "lodash/fp";

import ComponentChrome from "./components/ComponentChrome"
import Renderer from "./Renderer";
import { useStore }  from "../state";
import useDispatch from "./hooks/useDispatch";
import useListen from "./hooks/useListen";
import useStorage from "./hooks/useStorage";
import { toComponent } from "./utils";

function ComponentRenderer({ component: Component, name }) {
    if (!Component) {
        return <ComponentChrome name={name} />;
    }

    return (
        <ComponentChrome name={name}>
            <Renderer>
                <Component />
            </Renderer>
        </ComponentChrome>
    )
}

export default function AppsRenderer(props) {
    const [components, application] = useStore(state => [
        state.components,
        state.selectedApplication
    ]);

    const [scope, setScope] = useState();
    const [fns, setFns] = useState([]);

    useEffect(() => {
        const scope = {
            useDispatch: useDispatch(application),
            useListen: useListen(application),
            useStorage: useStorage(application),
        }
        setScope(scope);

        const addFn = (component => ({
            ...component,
            fn: toComponent(component.name, component.src, scope)
        }))

        components
            |> Object.values
            |> map(addFn)
            |> setFns;

    }, [application, components]);

    const elements = map(fn => (
        <ComponentRenderer key={fn.name} name={fn.name} component={fn.fn} />
    ), fns);

    return (
        <div className="components">
            {elements}
        </div>
    )
}
