import React, { useEffect, useRef, useState } from "react";
import { map, sortBy } from "lodash/fp";
import getArgs from "../../../helpers/getArgs";

const useMutationObserver = (target, callback) => {
    const observer = new MutationObserver(mutationRecord => mutationRecord.forEach(callback));

    useEffect(() => {
        if (observer && target?.current) {
            observer.observe(target.current, { attributes: true });
            return () => observer.disconnect();
        }
    }, [target, observer]);
};


export const ObjectNode = ({ name, value }) => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    useMutationObserver(ref, ({ type, target }) => {
        if (type === "attributes") {
            const openValue = target?.getAttribute("open");
            setOpen(typeof openValue === "string");
        }
    });

    const children = do {
        if (!open) {
            null;
        } else if (typeof value === "object") {
            <div className="scope-wrapper">
                {do {value
                    |> Object.entries
                    |> sortBy(([key]) => key)
                    |> map(([name, value]) => <TreeViewer key={name} name={name} value={value} />);
                }}
            </div>
        } else {
            <p>
                {value.toString()}
            </p>
        }
    }

    return (
        <details className="scope-details" ref={ref}>
            <summary>{name}</summary>
            {children}
        </details>
    );
}

export const LeafNode = ({ name, value }) => (
    <div>
        <b>{name}{value ? ":" : ""}</b>
        {" "}
        {value?.toString()}
    </div>
);

export const TreeViewer = ({ name, value }) => {
    switch (typeof value) {
        case "object":
            return <ObjectNode name={name} value={value} />
        case "function":
            return <LeafNode name={`${name}(${getArgs(value)})`} />
        default:
            return <LeafNode name={name} value={value} />
    }
}