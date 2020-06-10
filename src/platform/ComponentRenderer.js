import React from "react";
import { useSetRecoilState, useResetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import ComponentChrome from "./ComponentChrome";
import Renderer from "./Renderer";
import { componentStateFamily, componentIdsState, selectedIdState } from "./state";

export default function ComponentRenderer({ id }) {
    const { fn: Component, name } = useRecoilValue(componentStateFamily(id));
    const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
    const [componentIds, setComponentIds] = useRecoilState(componentIdsState);

    if (!Component) {
        return null;
    }

    const remove = () => {
        const filteredIds = componentIds.filter(id_ => id_ !== id);
        setComponentIds(filteredIds);
        resetComponent();
        removeItem(props.id);

        if (id === selectedId) {
            setSelectedId(filteredIds[0]);
        }
    }

    const select = () => setSelectedId(id);

    return (
        <ComponentChrome name={name} remove={remove} select={select}>
            <Renderer>
                <Component />
            </Renderer>
        </ComponentChrome>
    );
}

