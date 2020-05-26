import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow';

import ComponentSelector from "./ComponentSelector"
import { toFunc } from "./utils"
import { componentStateFamily } from "./state";
import { setItem } from "./storage.js";

export default function ComponentEditor (props) {
    const [component, updateComponent] = useRecoilState(componentStateFamily(props.selectedId));
    const [name, setName] = useState(component.name);
    const [code, setCode] = useState(component.src);
    const [error, setError] = useState(null);

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
            setItem(
                props.selectedId,
                JSON.stringify({ name, src: code })
            );
        } catch(e) {
            console.log(e);
            setError(e.message);
        } finally {
            event.preventDefault();
        }
    }

    return (
        <form className="editor-container" onSubmit={handleSubmit}>
            <div className="editor-toolbar">
                <ComponentSelector />
                <button type="button" onClick={props.addNew}>New component</button>
                <label htmlFor={props.selectedId}>
                    <input value={name} onChange={onChangeName} />
                </label>
            </div>
            <Editor
                autoFocus
                padding={5}
                className="editor"
                id={props.selectedId}
                highlight={code => highlight(code, languages.js)}
                value={code}
                onValueChange={(code) => {
                    setCode(code);
                    setError(null);
                }}
            />
            {error && <span>Error: {error}</span>}
            <button type="submit">Save</button>
        </form>
    )
}
