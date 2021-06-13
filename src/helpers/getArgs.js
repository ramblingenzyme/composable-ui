import {
  map,
  filter,
  split,
  identity,
  trim,
  replace,
  toString,
  join,
} from "lodash/fp";

export default function getArgs(func) {
  const match = func.toString()?.match(/.*?\(([^)]*)\)/)?.[1];

  return (
    match
    |> split(",")
    |> map((arg) => arg |> replace(/\/\*.*\*\//, "") |> trim)
    |> filter(identity)
    |> join(", ")
  );
}
