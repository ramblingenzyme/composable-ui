import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow';

import ComponentSelector from "./ComponentSelector"
import { toComponent } from "./utils"
import { componentStateFamily } from "./state";
import { setItem } from "./storage.js";

const useEditComponent = (id) => {
    const [component, setComponent] = useRecoilState(componentStateFamily(id));
    const [name, setName] = useState(component.name);
    const [code, setCode] = useState(component.src);
    const [error, setError] = useState(null);

    const changeName = (newName) => {
        setName(e.target.value);
        setError(null);
    };

    const changeCode = (newCode) => {
        setCode(newCode);
        setError(null);
    };

    const updateComponent = () => {
        setComponent({
            ...component,
            name,
            src: code,
            fn: toComponent(name, code),
        });
        setItem(
            id,
            JSON.stringify({ name, src: code })
        );
    };

    const handleSubmit = () => {
        try {
            updateComponent();
        } catch(e) {
            console.log(e);
            setError(e.message);
        } finally {
            event.preventDefault();
        }
    };

    return {
        changeCode,
        changeName,
        code,
        error,
        handleSubmit,
        name,
    }
}

export default function ComponentEditor ({ addNew, selectedId }) {
    const {
        changeCode,
        changeName,
        handleSubmit,
        name,
        code,
        error,
    } = useEditComponent(selectedId);

    return (
        <form className="editor-container" onSubmit={handleSubmit}>
            <div className="editor-toolbar">
                <ComponentSelector />
                <button type="button" onClick={addNew}>New component</button>
                <label htmlFor={selectedId}>
                    <input value={name} onChange={e => changeName(e.target.value)} />
                </label>
            </div>
            <Editor
                autoFocus
                padding={10}
                className="editor"
                id={selectedId}
                highlight={code => highlight(code, languages.js)}
                value={code}
                onValueChange={changeCode}
                preClassName="language-jsx"
            />
            {error && <span>Error: {error}</span>}
            <button type="submit">Save</button>
        </form>
    )
}
