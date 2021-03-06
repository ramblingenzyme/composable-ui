import { highlight, languages } from 'prismjs/components/prism-core';
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import React from "react";

import { componentIdsState, selectedIdState } from "./state";

import ComponentRenderer from "./ComponentRenderer";
import ComponentSelector from "./ComponentSelector";
import Editor from "./Editor";
import useEditComponent from "./hooks/useEditComponent";

export default function ComponentEditor () {
    const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
    const [componentIds, setComponentIds] = useRecoilState(componentIdsState)
    const {
        changeCode,
        changeName,
        handleSubmit,
        name,
        code,
        error,
    } = useEditComponent(selectedId);

    const addNew = () => {
        const newId = uuid();
        setComponentIds([...componentIds, newId])
        setSelectedId(newId);
    }

    const footer = (
        <>
            {error && <span>Error: {error}</span>}
            <button type="submit">Save</button>
        </>
    );

    return (
        <>
            <div>
                <div className="editor-toolbar">
                    <ComponentSelector />
                    <button type="button" onClick={addNew}>New component</button>
                    <label htmlFor={selectedId}>
                        <input value={name} onChange={e => changeName(e.target.value)} />
                    </label>
                </div>
                <Editor
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
            </div>
            <ComponentRenderer id={selectedId} />
        </>
    )
}
