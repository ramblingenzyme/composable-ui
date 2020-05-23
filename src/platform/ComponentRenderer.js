import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ErrorBoundary } from 'react-error-boundary'

import { componentStateFamily, selectedIdState } from "./state";

const getErrorFallback = (id) => ({error, componentStack, resetErrorBoundary}) => {
    const setSelectedId = useSetRecoilState(selectedIdState);
    return (
      <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <pre>{componentStack}</pre>
          <button onClick={() => setSelectedId(id)}>Edit component</button>
          <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
}

const ComponentChrome = (props) => {
    const { name } = useRecoilValue(componentStateFamily(props.id));
    const setSelectedId = useSetRecoilState(selectedIdState);

    return (
        <div className="component-wrapper">
            <div className="component-header">
                <p>{name}</p>
                <div>
                    <button onClick={() => setSelectedId(props.id)}>Edit</button>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default function ComponentRenderer(props) {
    const { fn: Component } = useRecoilValue(componentStateFamily(props.id));

    if (!Component) {
        return null;
    }

    return (
        <ComponentChrome id={props.id}>
            <ErrorBoundary
                FallbackComponent={getErrorFallback(props.id)}
            >
                <Component key={props.id} />
            </ErrorBoundary>
        </ComponentChrome>
    )
}
