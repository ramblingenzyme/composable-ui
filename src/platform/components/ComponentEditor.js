import { highlight, languages } from "prismjs/components/prism-core";
import { v4 as uuid } from "uuid";
import React from "react";

import { useStore } from "../../state";
import Editor from "../Editor";
import useEditComponent from "../hooks/useEditComponent";

import ComponentRenderer from "./ComponentRenderer";
import ComponentSelector from "./ComponentSelector";

export default function ComponentEditor({ selectedId }) {
  const { setComponent, setSelectedId } = useStore((state) => ({
    setComponent: state.setComponent,
    setSelectedId: state.setSelectedComponent,
  }));

  const { changeCode, changeName, handleSubmit, name, code, error } =
    useEditComponent(selectedId);

  const addNew = () => {
    const newId = uuid();
    setComponent(newId);
    setSelectedId(newId);
  };

  const footer = (
    <>
      {error && <span>Error: {error}</span>}
      <button type="submit">Save</button>
    </>
  );

  return (
    <>
      <header className="editor-toolbar">
        <ComponentSelector />
        <button type="button" onClick={addNew}>
          New component
        </button>
        <label htmlFor={selectedId}>
          <input value={name} onChange={(e) => changeName(e.target.value)} />
        </label>
      </header>
      <Editor
        footer={footer}
        onSubmit={handleSubmit}
        autoFocus
        padding={10}
        id={selectedId}
        highlight={(code) => highlight(code, languages.js)}
        value={code}
        onValueChange={changeCode}
        preClassName="language-jsx"
      />
    </>
  );
}
