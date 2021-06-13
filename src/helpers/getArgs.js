import {
  map,
  filter,
  split,
  identity,
  trim,
  replace,
  toString,
} from "lodash/fp";

export default function getArgs(func) {
  const match = func.toString()?.match(/.*?\(([^)]*)\)/)?.[1];

  return (
    match
    |> split(",")
    |> map((arg) => arg |> replace(/\/\*.*\*\//, "") |> trim)
    |> filter(identity)
  );
}
