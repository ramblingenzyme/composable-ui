import { filter } from "lodash/fp";
import React from "react";
import useListen from "../platform/hooks/useListen";
import useDispatch from "../platform/hooks/useDispatch";
import useStorage from "../platform/hooks/useStorage";

const reactHooks =
  React
  |> Object.entries
  |> filter(([key]) => key.startsWith("use"))
  |> Object.fromEntries;

export const defaultScope = {
  React,
  ...reactHooks,
  useListen: useListen(),
  useDispatch: useDispatch(),
  useStorage: useStorage("app"),
};
