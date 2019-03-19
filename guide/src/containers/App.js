import React, { Component } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import WithClass from '../hoc/WithClass';
import anotherWithClass from '../hoc/anotherWithClass';
import Aux from '../hoc/Aux';


class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }
  // more modern syntax, setting the class field, could also use this.state in constructor
  state = {
    persons: [
      { id: 'aqgQDw3r1t1', name: "chris", age: "30" },
      { id: 'gwovsh98c7y', name: "patsy", age: 27 },
      { id: 'qaciox8z978', name: "taco", age: 5 }
    ],
    otherState: "This is working!!",
    showPersons: false,
    showCockpit: true,
    changedCounter: 0
  };

  // old lifecyle method not that useful
  // used to initialize the state of a 
  // component from new props that were passed to it
  // before shouldComponentUpdate, render
  // *** not needed if want to base ypuor state on props,
  // *** you can useSate(){} instead!
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  // lifecycle hook, allows you to cancel or continue
  // before render
  static shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate')
  }

  // takes previous state, props
  // last minute DOM ops
  // called after render
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  // old lifecyle method, do not use
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  // can be used for performance optimizations
  // decides when to re render 
  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate');
    console.log('    // this can be used to block the update');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }
  

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

    // set the state with new values,
    // THIS IS JUST WRONG!
    // setState does not automatically update state immediately,
    // the state update happens when available resources become 
    // available
    // Therefore you shoule never use this.state. inside of setState()
    // this.setState({ 
    //   persons,
    //   changedCounter: this.state.changedCounter + 1
    // });

    // use this to update state with prev state :)
    this.setState((prevState, props) => {
      return { 
        persons,
        changedCounter: prevState.changedCounter + 1
      };
    });
  };
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
  render() {
    console.log('[App.js] render')
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }
    return (
      <Aux classes={classes.App}>
        <button onClick={() => this.setState({showCockpit: false})}>Remove Cockpit</button>
        {this.state.showCockpit ? 
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            otherState={this.state.otherState}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonHandler} /> 
            : null}
        {persons}
      </Aux>
    );
  }
}

export default anotherWithClass(App, classes.App);
