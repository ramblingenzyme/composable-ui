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
import AppRenderer from './platform/AppRenderer';
import { initializeState } from "./platform/state";

function App({ initialState }) {
    const [activeView, setActiveView] = useState("components");

    return (
        <RecoilRoot initializeState={initializeState(initialState)}>
            <Header setActive={setActiveView} />
            {activeView === "components" && <ComponentEditor />}
            {activeView === "desktop" && <AppRenderer />}
        </RecoilRoot>
    );
}

export default App;
