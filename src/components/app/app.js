import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AuthContext from '../../context/auth/context.js';
import SettingsContext from '../../context/settings/context.js';
import Main from '../main/main.js';

function App() {
  return (
    <SettingsContext>
      <Main />
    </SettingsContext>
  );
}

export default App;
