import React from "react";

export default function ComponentChrome({ children, name, reset, select }) {
  return (
    <div className="component-wrapper">
      <div className="component-header">
        <p>{name}</p>
        <div>
          {select && <button onClick={select}>Edit</button>}
          {reset && <button onClick={reset}>Remove</button>}
        </div>
      </div>
      {children}
    </div>
  );
}
