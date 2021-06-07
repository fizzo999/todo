import React from 'react';

export const AuthContext = React.createContext();

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,

    }
  }
}
export default Auth;