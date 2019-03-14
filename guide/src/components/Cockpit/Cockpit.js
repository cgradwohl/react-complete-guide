import React, {useState, useEffect} from 'react';
import classes from './Cockpit.css';
const cockpit = (props) => {
  // if want to base your state on props,
  // you can useSate(){} instead!
  useState((state, stateHandler) => {

  });

  // Runs every render cycle (creation or )
  // componentDidMount() and ComponentDidUpdate() combined
  useEffect(() => {
    console.log('[Cockpit.js] useEffect(), happens every render cycle');
    // HTTP REQ
    setTimeout(() => {
      alert('DUDEBRO');
    }, 1000);
    return () => {
      // this runs for the last time
      console.log('[Cockpit.js] Cleanup work');
    }
    // you can pass an array as a second arg 
    // to useEffects which will tell it to 
    // run only when that dependency/props has changed.
    // pass empty array to only runs the first time!
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      // this runs for the last time
      console.log('[Cockpit.js] Cleanup work in 2nd useEffect');
    }
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