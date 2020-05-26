import React from "react";
import { useSetRecoilState, useResetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { ErrorBoundary } from 'react-error-boundary'

import { componentStateFamily, componentIdsState, selectedIdState } from "./state";
import { removeItem } from "./storage";

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
    const [componentIds, setComponentIds] = useRecoilState(componentIdsState);
    const resetComponent = useResetRecoilState(componentStateFamily(props.id));

    const removeComponent = () => {
        const filteredIds = componentIds.filter(id => id !== props.id);
        setComponentIds(filteredIds);
        setSelectedId(filteredIds[0]);
        resetComponent();
        removeItem(props.id);
    }

    return (
        <div className="component-wrapper">
            <div className="component-header">
                <p>{name}</p>
                <div>
                    <button onClick={() => setSelectedId(props.id)}>Edit</button>
                    <button onClick={removeComponent}>Remove</button>
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
                resetKeys={[Component]}
            >
                <Component />
            </ErrorBoundary>
        </ComponentChrome>
    )
}
