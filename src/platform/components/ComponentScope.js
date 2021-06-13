import React from "react";
import { TreeViewer } from "./scope/nodes";

const ComponentScope = ({ scope }) => {
  return <TreeViewer name="Scope" value={scope} />;
};

export default ComponentScope;
