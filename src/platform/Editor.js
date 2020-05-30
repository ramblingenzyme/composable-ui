import React from "react";
import Ed from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow';

import ComponentSelector from "./ComponentSelector"
import { toComponent } from "./utils"
import { componentStateFamily, selectComponentScope } from "./state";
import { setItem } from "./storage.js";

export default function Editor ({
    header,
    footer,
    onSubmit,
    ...rest
}) {
    return (
        <form className="editor-container" onSubmit={onSubmit}>
            {header}
            <Ed
                className="editor"
                {...rest}
            />
            {footer}
        </form>
    )
}
