import React from 'react';
import classes from './Person.css';
const person = props => {
  return (
    <div className={classes.Person}>
      {/* mutating state in parent component from a child presentational compnent */}
      <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;
