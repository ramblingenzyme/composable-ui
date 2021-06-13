import React from "react";
import { LeafNode, ObjectNode, TreeViewer } from "./scope/nodes";

const ComponentScope = ({ scope }) => {
    return (
        <section>
            <TreeViewer name="Scope" value={scope} />
        </section>
    );
}

export default ComponentScope;