import React from 'react';
import classes from './Cockpit.css';
const cockpit = (props) => {
  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Green;
  }

  if (props.persons.length <= 2) assignedClasses.push(classes.green);
  if (props.persons.length <= 1) assignedClasses.push(classes.bold);
  if (props.persons.length == 0) {
    const idx = assignedClasses.findIndex(el => el === 'green');
    assignedClasses[idx] = 'red';
  }
  return (
    <div className={classes.Cockpit}>
      <h1>hi i am a react app</h1>
      <h3>{props.otherState}</h3>
      <p className={assignedClasses.join(' ')}>This is working</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
    </div>
  )
};

export default cockpit;