import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default function Renderer({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[children]}>
      {children}
    </ErrorBoundary>
  );
}
