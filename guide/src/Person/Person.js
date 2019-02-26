import React from 'react';
const person = props => {
  return (
    <div>
      {/* mutating state in parent component from a child presentational compnent */}
      <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;
