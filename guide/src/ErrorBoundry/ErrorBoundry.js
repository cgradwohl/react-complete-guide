import React, { Component } from 'react';

// NICE TOOL TO HANDLE A SITUTATION WHERE WE MAY NEED TO HANDLE AN ERROR GRACEFULLY
// https://reactjs.org/docs/error-boundaries.html
class ErrorBoundry extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  // fires whenever a wrapped component throw an error
  componentDidCatch = (err, info) => {
    this.setState({ hasError: true, errorMessage: err })
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>
    } else {
      // this will be whatever is wrapped by our ErrorBoundry Component
      return this.props.children;
    }
  }
}

export default ErrorBoundry;