import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { selectedIdState, selectComponentOptions } from "./state";

export default function ComponentSelector () {
    const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
    const componentOptions = useRecoilValue(selectComponentOptions);
    const onSelect = (e) => setSelectedId(e.target.value);

    return (
        <select name="components" onChange={onSelect}>
            {componentOptions.map(({ id, name}) => (
                <option
                    key={id}
                    value={id}
                    selected={id === selectedId}
                >
                    {name}
                </option>
            ))}
        </select>
    );
}
