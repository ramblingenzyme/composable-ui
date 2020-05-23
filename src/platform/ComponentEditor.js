import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { toFunc } from "./utils"
import { componentStateFamily } from "./state";

export default function ComponentEditor (props) {
    const [component, updateComponent] = useRecoilState(componentStateFamily(props.selectedId));
    const [name, setName] = useState(component.name);
    const input = React.useRef(null);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (event) => {
        try {
            const newSrc = input.current.value;

            updateComponent({
                ...component,
                name,
                src: newSrc,
                fn: toFunc(newSrc),
            });

            props.addNew();
        } catch(e) {
            console.log(e);
        } finally {
            event.preventDefault();
        }
    }

    return (
        <form className="editor" onSubmit={handleSubmit}>
            <label htmlFor={props.id}><input value={name} onChange={onChangeName} /></label>
            <textarea id={props.id} ref={input} defaultValue={component.src} />
            <button type="submit">Submit</button>
        </form>
    )
}
