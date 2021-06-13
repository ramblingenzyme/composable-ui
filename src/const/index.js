import { filter } from "lodash/fp";
import React from "react";
import useListen from "../platform/hooks/useListen";
import useDispatch from "../platform/hooks/useDispatch";
import useStorage from "../platform/hooks/useStorage";
import _ from "lodash";
import _fp from "lodash/fp";

const reactHooks =
  React
  |> Object.entries
  |> filter(([key]) => key.startsWith("use"))
  |> Object.fromEntries;

export const defaultScope = {
  _: { ..._ },
  fp: { ..._fp },
  React,
  ...reactHooks,
  useListen: useListen(),
  useDispatch: useDispatch(),
  useStorage: useStorage("app"),
};
