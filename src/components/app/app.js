import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AuthContext from '../../context/auth/context.js';
import SettingsContext from '../../context/settings/context.js';
import ToDoConnected from '../todo/todo-connected.js';

function App() {
  return (
    <SettingsContext>
      <ToDoConnected />
    </SettingsContext>
  );
}

export default App;
