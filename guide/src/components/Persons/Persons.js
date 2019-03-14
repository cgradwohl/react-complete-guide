import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log('[Person.js] getDerivedStateFromProps')
    return state;
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Person.js] shouldComponentUpdate')
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Person.js] getSnapshotBeforeUpdate')
    return null;
  }

  componentDidUpdate(){
    console.log('[Person.js] componentDidUpdate')
  }

  render() {
    console.log('[Person.js] rendering ...')
    return this.props.persons.map((obj, idx) => {
      return (
        <Person
          key={obj.id}
          click={this.props.clicked.bind(this, idx)}
          name={obj.name}
          age={obj.age}
          changed={this.props.changed.bind(this, obj.id)} />
      )
    });
  }
}

// const persons = (props) => {
//   console.log('[Person.js] rendering ...')
//   return props.persons.map((obj, idx) => {
//     return <Person
//       key={obj.id}
//       click={props.clicked.bind(this, idx)}
//       name={obj.name}
//       age={obj.age}
//       changed={props.changed.bind(this, obj.id)} />
//   });
// }


export default Persons;