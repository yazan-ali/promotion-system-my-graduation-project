import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { AuthProvider } from './Components/UserComponents/userContext';
import Routes from './Routes/routes';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;