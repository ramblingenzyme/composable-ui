
export const map = fn => arr => arr.map(fn);

const mapValue = fn => ([key, val]) => [key, fn(val, key)];
const mapKey = fn => ([key, val]) => [fn(val, key), val];

export const mapValues = fn => fn
    |> mapValue
    |> map;

export const mapKeys = fn => fn
    |> mapKey
    |> map;

export const objectMap = (fn, obj) => obj
    |> Object.entries
    |> mapValues(fn)
    |> Object.fromEntries;