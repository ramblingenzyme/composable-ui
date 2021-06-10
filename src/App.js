import React, { useState } from 'react';

import Header from "./Header";
import ComponentEditor from "./platform/components/ComponentEditor";
import StyleEditor from "./platform/styles";
import AppRenderer from './platform/AppRenderer';
import { initializeState } from "./state";

function App() {
    const [activeView, setActiveView] = useState("components");

    return (
        <>
            <Header setActive={setActiveView} />
            {activeView === "styles" && <StyleEditor />}
            {activeView === "components" && <ComponentEditor />}
            {activeView === "desktop" && <AppRenderer />}
        </>
    );
}

export default App;
