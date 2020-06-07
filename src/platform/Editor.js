import React from "react";
import Ed from "react-simple-code-editor";

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow';

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
