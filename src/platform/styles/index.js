import React, { useEffect, useRef, useState } from "react";
import { highlight, languages } from 'prismjs/components/prism-core';

import Editor from "../Editor";

const IDS = [
    "utility-css",
    "app-css",
    "user-css",
];

const useStyleSheet = (id) => {
    const node = useRef(null);
    const [css, setCss] = useState();
    const [readOnly, setReadOnly] = useState(true);


    useEffect(() => {
        const init = async () => {
            const foundNode = document.getElementById(id);
            node.current = foundNode;
            if (foundNode.href) {
                const res = await fetch(foundNode.href);
                const fetchedCss = await res.text();
                console.log(fetchedCss);
                setCss(fetchedCss);
                setReadOnly(true);
            } else if ("innerText" in foundNode) {
                console.log(foundNode.innerText);
                setCss(foundNode.innerText);
                setReadOnly(false);
            }
        }

        if (id) {
            init();
        }
    }, [id]);


    if (readOnly) {
        return [css];
    } else {
        const save = () => {
            if (node.current && !readOnly) {
                node.current.textContent = css;
            }
        }

        return [
            css,
            setCss,
            save,
        ]
    }

}

export default function StyleEditor ({

}) {
    const [id, setId] = useState(IDS[2]);
    console.log(id);
    const [css, setCss, save] = useStyleSheet(id);

    if (typeof css !== 'string') {
        return <pre>Loading...</pre>
    }

    const footer = (
        <button type="submit">Save</button>
    );

    return (
        <Editor
            autoFocus
            footer={footer}
            highlight={code => highlight(code, languages.css)}
            id={id}
            onSubmit={save}
            onValueChange={setCss}
            padding={10}
            value={css}
        />
    )
}
