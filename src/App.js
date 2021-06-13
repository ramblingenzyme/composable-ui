import React, { useEffect, useState } from "react";

import Header from "./Header";
import StyleEditor from "./platform/styles";
import AppRenderer from "./platform/AppRenderer";
import { initializeState, useStore } from "./state";
import { defaultScope } from "./const";
import ComponentsPage from "./platform/components";

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
      {activeView === "components" && <ComponentsPage />}
      {activeView === "desktop" && <AppRenderer />}
    </>
  );
}

export default App;
