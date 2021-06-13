import React from "react";

import Renderer from "../Renderer";
import { useStore } from "../../state";

import ComponentChrome from "./ComponentChrome";

export default function ComponentRenderer({ id }) {
  const [Component, name, removeComponent] = useStore((state) => [
    state.functions[id],
    state.components[id]?.name || "No name",
    state.removeComponent,
  ]);

  const [selectedId, setSelectedId] = useStore((state) => [
    state.selectedComponent,
    state.setSelectedComponent,
  ]);
  const remove = () => removeComponent(id);
  const select = () => setSelectedId(id);

  if (!Component) {
    return <ComponentChrome name={name} reset={remove} select={select} />;
  }

  return (
    <ComponentChrome name={name} reset={remove} select={select}>
      <Renderer>
        <Component />
      </Renderer>
    </ComponentChrome>
  );
}
