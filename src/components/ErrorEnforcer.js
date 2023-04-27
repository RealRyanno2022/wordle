import ErrorBoundary from './ErrorBoundary';
import Card from './Card';
function ErrorEnforcer() {
  
  return (
      <ErrorBoundary>
        <Card /> 
      </ErrorBoundary>
  )
}

export default ErrorEnforcer;