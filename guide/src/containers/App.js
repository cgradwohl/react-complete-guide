import React, { useState, Component } from "react";
import classes from "./App.css";
import Person from "../components/Persons/Person/Person";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
  state = {
    persons: [
      { id: 'aqgQDw3r1t1', name: "chris", age: 30 },
      { id: 'gwovsh98c7y', name: "patsy", age: 27 },
      { id: 'qaciox8z978', name: "taco", age: 5 }
    ],
    otherState: "some other state",
    showPersons: false
  };
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 30 },
        { name: "patsy", age: 27 },
        { name: "taco", age: 5 }
      ]
    })
  }

  deletePersonHandler = (idx) => {
    const persons = [...this.state.persons];
    persons.splice(idx, 1);
    this.setState({ persons })
  }

  nameChangedHandler = (id, event) => {
    // get the index or reference to the state 
    const personIdx = this.state.persons.findIndex(p => p.id === id);

    // copying the state key, not mutating it directly
    const person = {
      ...this.state.persons[personIdx]
    }
    // -or-
    // const person = Object.assign({}, this.state.persons[personIdx])

    // update the new value, to be in state
    person.name = event.target.value;

    // copying the state object
    const persons = [...this.state.persons]

    // -or-
    // const persons = this.state.persons.slice()

    // update the new value
    persons[personIdx] = person;

    // set the state with new values
    this.setState({ persons });
  }
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }
    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          otherState={this.state.otherState}
          persons={this.state.persons}
          clicked={this.togglePersonHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
