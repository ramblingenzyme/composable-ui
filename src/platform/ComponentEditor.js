import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism';

import ComponentSelector from "./ComponentSelector"
import { toFunc } from "./utils"
import { componentStateFamily } from "./state";

export default function ComponentEditor (props) {
    const [component, updateComponent] = useRecoilState(componentStateFamily(props.selectedId));
    const [name, setName] = useState(component.name);
    const [code, setCode] = useState(component.src);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        try {
            updateComponent({
                ...component,
                name,
                src: code,
                fn: toFunc(code),
            });
        } catch(e) {
            console.log(e);
        } finally {
            event.preventDefault();
        }
    }

    return (
        <form className="editor-container" onSubmit={handleSubmit}>
            <div className="editor-toolbar">
                <ComponentSelector />
                <button type="button" onClick={props.addNew}>New component</button>
                <label htmlFor={props.id}>
                    <input value={name} onChange={onChangeName} />
                </label>
            </div>
            <Editor
                padding={5}
                className="editor"
                id={props.id}
                highlight={code => highlight(code, languages.js)}
                value={code}
                onValueChange={setCode}
            />
            <button type="submit">Save</button>
        </form>
    )
}
