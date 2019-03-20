import React from 'react';

const authContext = React.createContext({
  // here we define the shape of context data for editor linting
  // defines what the context will look like and what we can expect
  authed: false,
  login: () => {}
});

export default authContext;