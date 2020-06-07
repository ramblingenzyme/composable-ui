import React, { useState } from 'react';
import {
    RecoilRoot,
    useTransactionObservation_UNSTABLE,
} from "recoil"

import './App.css';

import Header from "./Header";
import ComponentEditor from "./platform/ComponentEditor";
import useDispatch from "./platform/hooks/useDispatch";
import useListen from "./platform/hooks/useListen";
import Renderer from './platform/Renderer';
import { initializeState } from "./platform/state";

function App() {
    const [activeView, setActiveView] = useState("components");

    return (
        <RecoilRoot initializeState={initializeState}>
            <Header setActive={setActiveView} />
            {activeView === "components" && <ComponentEditor />}
            {activeView === "desktop" && <Renderer />}
        </RecoilRoot>
    );
}

export default App;
