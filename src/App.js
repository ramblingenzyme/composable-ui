import React, { useEffect, useState } from "react";

import Header from "./Header";
import ComponentEditor from "./platform/components/ComponentEditor";
import ComponentScope from "./platform/components/ComponentScope";
import StyleEditor from "./platform/styles";
import AppRenderer from "./platform/AppRenderer";
import { initializeState, useStore } from "./state";
import { defaultScope } from "./const";

const useSyncStyles = () => {
  const css = useStore((store) => store.css);

  useEffect(() => {
    const node = document.getElementById("user-css");
    if (node) {
      node.textContent = css;
    }
  }, [css]);
};

function App() {
  const [activeView, setActiveView] = useState("components");
  useSyncStyles();

  return (
    <>
      <Header setActive={setActiveView} />
      {activeView === "styles" && <StyleEditor />}
      {activeView === "components" && (
        <>
          <ComponentScope scope={defaultScope} />
          <ComponentEditor />
        </>
      )}
      {activeView === "desktop" && <AppRenderer />}
    </>
  );
}

export default App;
