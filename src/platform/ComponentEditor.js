import React from "react";
import { highlight, languages } from 'prismjs/components/prism-core';

import ComponentSelector from "./ComponentSelector"
import Editor from "./Editor";
import useEditComponent from "./hooks/useEditComponent";

export default function ComponentEditor ({ addNew, selectedId }) {
    const {
        changeCode,
        changeName,
        handleSubmit,
        name,
        code,
        error,
    } = useEditComponent(selectedId);

    const header = (
        <div className="editor-toolbar">
            <ComponentSelector />
            <button type="button" onClick={addNew}>New component</button>
            <label htmlFor={selectedId}>
                <input value={name} onChange={e => changeName(e.target.value)} />
            </label>
        </div>
    );

    const footer = (
        <>
            {error && <span>Error: {error}</span>}
            <button type="submit">Save</button>
        </>
    );

    return (
        <Editor
            header={header}
            footer={footer}
            onSubmit={handleSubmit}
            autoFocus
            padding={10}
            id={selectedId}
            highlight={code => highlight(code, languages.js)}
            value={code}
            onValueChange={changeCode}
            preClassName="language-jsx"
        />
    )
}
