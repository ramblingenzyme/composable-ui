import React from "react";
import ComponentScope from "./ComponentScope";
import ComponentEditor from "./ComponentEditor";
import { defaultScope } from "../../const";
import { useStore } from "../../state";
import ComponentRenderer from "./ComponentRenderer";

const ComponentsPage = () => {
  const selectedId = useStore((store) => store.selectedComponent);

  return (
    <section className="components-page">
      <aside className="component-scope">
        <ComponentScope scope={defaultScope} />
      </aside>
      <section className="component-editor">
        <ComponentEditor selectedId={selectedId} />
      </section>
      <section className="component-renderer">
        <ComponentRenderer id={selectedId} />
      </section>
    </section>
  );
};

export default ComponentsPage;
