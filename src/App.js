import React from 'react';
import './App.css';
import {
    RecoilRoot,
    useTransactionObservation_UNSTABLE,
} from "recoil"
import Renderer from './platform/Renderer';
import { initializeState } from "./platform/state";
import useListen from "./platform/hooks/useListen";
import useDispatch from "./platform/hooks/useDispatch";

window.React = React;
window.useListen = useListen;
window.useDispatch = useDispatch;

function App() {
  return (
    <RecoilRoot initializeState={initializeState}>
        <Renderer />
    </RecoilRoot>
  );
}

export default App;
