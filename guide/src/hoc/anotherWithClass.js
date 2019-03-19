import React from 'react';

// a reg js func thst returns a react fucn component
const anotherWithClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
}

export default anotherWithClass;