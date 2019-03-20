import React from 'react';
const validationComponent = (props) => {
  return (
    <div>
      <h1>{props.textLen >= 5 ? "Text Long Enough." : "Text Too Short!"}</h1>
    </div>
  )
}
export default validationComponent;