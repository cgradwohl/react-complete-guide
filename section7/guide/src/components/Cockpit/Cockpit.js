import React, { useState, useEffect, useRef, useContext } from "react";
import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context";
const cockpit = props => {
  const toggleBtnRef = useRef(null);

  const authContextObj = useContext(AuthContext);

  console.log("are we authed?", authContextObj.authed);

  // if want to base your state on props,
  // you can useSate(){} instead!
  useState((state, stateHandler) => {});

  // Runs every render cycle (creation or )
  // componentDidMount() and ComponentDidUpdate() combined
  useEffect(() => {
    console.log(
      "[Cockpit.js] useEffect(), happens every render cycle, after mount"
    );
    // this code runs when component did mount
    // setTimeout(() => {
    //   alert('DUDEBRO');
    // }, 1000);
    toggleBtnRef.current.click();
    // this code runs when dep un mounts based on the dep args list you pass
    return () => {
      // runs AFTER every render cycle
      console.log("[Cockpit.js] Cleanup work");
    };
    // you can pass an array as a second arg
    // to useEffects which will tell it to
    // run only when that dependency/props has changed.
    // pass empty array to only runs the first time!
  }, []);

  // 1. nothiing - runs on every update/ render cycle
  // 2. [] - useEffect() will run when the component is destroyed
  // 3. [dep1, dep2, ...] - will run when only when dep1, dep2, ... has changed
  // 4. return () => {} - runs AFTER every render cycle

  // runs for every render/update cycle
  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    // runs AFTER every render cycle
    return () => {
      // this runs for the last time
      console.log("[Cockpit.js] Cleanup work in 2nd useEffect");
    };
  });

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Green;
  }

  if (props.personsLength <= 2) assignedClasses.push(classes.green);
  if (props.personsLength <= 1) assignedClasses.push(classes.bold);
  if (props.personsLength === 0) {
    const idx = assignedClasses.findIndex(el => el === "green");
    assignedClasses[idx] = "red";
  }
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>{props.otherState}</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      {<button onClick={authContextObj.login}>Login</button>}
    </div>
  );
};

export default React.memo(cockpit);
