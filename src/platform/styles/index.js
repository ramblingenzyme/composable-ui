import React, { useEffect, useRef, useState } from "react";
import { highlight, languages } from "prismjs/components/prism-core";

import Editor from "../Editor";
import { useStore } from "../../state";

const useEditStyles = () => {
  const [savedCss, saveCss] = useStore((store) => [store.css, store.setCss]);

  const [localCss, setLocalCss] = useState(savedCss);
  const save = () => {
    saveCss(localCss);
  };

  return [localCss, setLocalCss, save];
};

export default function StyleEditor({}) {
  const [css, setCss, save] = useEditStyles();

  if (typeof css !== "string") {
    return <pre>Loading...</pre>;
  }

  const footer = <button type="submit">Save</button>;

  const onSubmit = (e) => {
    e.preventDefault();
    save();
  };

  return (
    <Editor
      autoFocus
      footer={footer}
      highlight={(code) => highlight(code, languages.css)}
      onSubmit={onSubmit}
      onValueChange={setCss}
      padding={10}
      value={css}
    />
  );
}
