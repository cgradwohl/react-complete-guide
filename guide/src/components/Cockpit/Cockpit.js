import React, {useEffect} from 'react';
import classes from './Cockpit.css';
const cockpit = (props) => {
  // Runs every update cycle
  useEffect(() => {
    console.log('[Cockpit.js] useEffect()');
  });
  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Green;
  }

  if (props.persons.length <= 2) assignedClasses.push(classes.green);
  if (props.persons.length <= 1) assignedClasses.push(classes.bold);
  if (props.persons.length === 0) {
    const idx = assignedClasses.findIndex(el => el === 'green');
    assignedClasses[idx] = 'red';
  }
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>{props.otherState}</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
    </div>
  )
};

export default cockpit;