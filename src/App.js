import React from 'react';
import './App.css';
import {
    RecoilRoot,
    useTransactionObservation_UNSTABLE,
} from "recoil"
import Renderer from './platform/Renderer';
import { initializeState } from "./platform/state";

window.React = React;

function App() {
  return (
    <RecoilRoot initializeState={initializeState}>
        <Renderer />
    </RecoilRoot>
  );
}

export default App;
