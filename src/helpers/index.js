import { capitalize, trim } from "lodash";
import { map } from "lodash/fp";

import { transform } from "sucrase";
import { defaultScope } from "../const";

const transpile = (src) => transform(src, { transforms: ["jsx"] }).code;

export const escapeFnName = (name) =>
  trim(name).split(" ").map(capitalize).join("");

const parseArgs = (args = {}) => [Object.keys(args), Object.values(args)];

export const toFunc = (src, ...args) => {
  const transformed = transpile(src);
  // eslint-disable-next-line no-new-func
  console.log(transformed);
  const fn = new Function(...args, transformed);
  return fn;
};

export const toComponent = (name, src, args = {}) => {
  const safeName = escapeFnName(name);
  const transformed = transpile(src);

  const scope = {
    ...defaultScope,
    ...args,
  };

  if (scope[safeName]) {
    delete scope[safeName];
  }

  const [scopeVariableNames, scopeVariableValues] = parseArgs(scope);

  const generator = new Function(
    ...scopeVariableNames,
    `
        return function ${safeName} (props) {
            ${transformed}
        }
    `
  );

  return generator(...scopeVariableValues);
};
