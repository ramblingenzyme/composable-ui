import React from 'react';
import './App.css';
import {
    RecoilRoot
} from "recoil"
import Renderer from './platform/Renderer';
import { html } from "htm/react";

window.React = React;
window.html = html;

function App() {
  return (
    <RecoilRoot>
        <Renderer />
    </RecoilRoot>
  );
}

export default App;
