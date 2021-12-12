import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { AuthProvider } from './Components/UserComponents/userContext';
import Routes from './Routes/routes';
import Navbar from './Components/navbar';
import axios from 'axios';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;