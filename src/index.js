import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { getAllKeys, getItem } from "./platform/storage";
import { toComponent } from "./platform/utils";

const getData = async () => {
    const keys = await getAllKeys();
    if (!keys.length) {
        return;
    }

    const components = await Promise.all(keys.map(async key => {
        const value = await getItem(key);
        const parsed = JSON.parse(value);
        try {
            const fn = toComponent(parsed.name, parsed.src);
            return [key, {
                ...parsed,
                fn,
            }];
        } catch (e) {
            return [key, parsed];
        }
    }));

    return {
        components,
        keys,
    }
}

const render = async () => {
    const initialState = await getData();

    ReactDOM.render(
        <React.StrictMode>
            <App initialState={initialState} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

render();