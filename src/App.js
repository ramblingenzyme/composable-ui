import React from 'react';
import './App.css';
import {
    RecoilRoot,
    useTransactionObservation_UNSTABLE,
} from "recoil"
import Renderer from './platform/Renderer';

window.React = React;

function App() {
  return (
    <RecoilRoot>
        <Renderer />
    </RecoilRoot>
  );
}

export default App;
