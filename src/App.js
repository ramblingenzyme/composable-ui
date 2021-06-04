import React, { useState } from 'react';

import './App.css';

import Header from "./Header";
import ComponentEditor from "./platform/ComponentEditor";
import AppRenderer from './platform/AppRenderer';
import { initializeState } from "./platform/state";

function App() {
    const [activeView, setActiveView] = useState("components");

    return (
        <>
            <Header setActive={setActiveView} />
            {activeView === "components" && <ComponentEditor />}
            {activeView === "desktop" && <AppRenderer />}
        </>
    );
}

export default App;
