import { capitalize, trim } from "lodash";
import React from "react";
import { transform } from "sucrase";
import useListen from "./hooks/useListen";
import useDispatch from "./hooks/useDispatch";
import useStorage from "./hooks/useStorage";

const transpile = src => transform(
    src,
    { transforms: ["jsx"] }
).code;

export const escapeFnName = (name) => trim(name)
    .split(" ")
    .map(capitalize)
    .join("");

const parseArgs = (args = {}) => ({
    names: Object.keys(args),
    values: Object.values(args),
});

export const toFunc = (src) => {
    const transformed = transpile(src);
    // eslint-disable-next-line no-new-func
    const fn = new Function(transformed)
    return fn;
};

const defaultScope = {
    React,
    ...React,
    useListen,
    useDispatch,
    useStorage,
}

export const toComponent = (name, src, args = {}) => {
    const safeName = escapeFnName(name);
    const transformed = transpile(src);
    const { names, values } = parseArgs({
        ...args,
        ...defaultScope,
    });

    const generator = new Function(...names, `
        return function ${safeName} (props) {
            ${transformed}
        }
    `);

    return generator(...values);
}
