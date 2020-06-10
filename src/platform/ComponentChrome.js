import React from "react";

export default function ComponentChrome({ children, name, reset, select }) {
    return (
        <div className="component-wrapper">
            <div className="component-header">
                <p>{name}</p>
                <div>
                    <button onClick={select}>Edit</button>
                    <button onClick={reset}>Remove</button>
                </div>
            </div>
            {children}
        </div>
    );
}
