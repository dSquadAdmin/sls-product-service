import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import './App.css';
import { useSelector } from 'react-redux';
import { AppState } from './store';
import DashBoard from './components/DashBoard';

function App() {
  const {authToken} = useSelector((state:AppState)=>state.auth);
  const [authoRized, setAuthorized] = useState(authToken !== "");

  useEffect(() => {
    setAuthorized(authToken !== "");
  }, [authToken]);
  return (
    <React.StrictMode>
      {!authoRized ? (
      <Login/>
      ) : (
        <div>
          <DashBoard />
        </div>
      )}
    </React.StrictMode>
  );
}

export default App;
