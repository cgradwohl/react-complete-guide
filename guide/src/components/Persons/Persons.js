import React from 'react';
import Person from './Person/Person';
const persons = (props) => props.persons.map((obj, idx) => {
  return <Person
    key={obj.id}
    click={props.clicked.bind(this, idx)}
    name={obj.name}
    age={obj.age}
    changed={props.changed.bind(this, obj.id)} />
});

export default persons;