import React from "react";
import ComponentScope from "./ComponentScope";
import ComponentEditor from "./ComponentEditor";
import { defaultScope } from "../../const";
import { useStore } from "../../state";
import ComponentRenderer from "./ComponentRenderer";

const ComponentsPage = () => {
  const selectedId = useStore((store) => store.selectedComponent);

  return (
    <section className="components-page" title="Components page">
      <aside className="component-scope" title="Component scope">
        <ComponentScope scope={defaultScope} />
      </aside>
      <section className="component-editor" title="Component editor">
        <ComponentEditor selectedId={selectedId} />
      </section>
      <section className="component-renderer" title="Component renderer">
        <ComponentRenderer id={selectedId} />
      </section>
    </section>
  );
};

export default ComponentsPage;
