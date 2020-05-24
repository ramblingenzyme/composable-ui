import { transform } from "sucrase";

export const toFunc = (src) => {
    // eslint-disable-next-line no-new-func
    const transformed = transform(src, {transforms: ["jsx"]}).code;
    return new Function(transformed)
};

