import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import { Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const hasJWT = localStorage.getItem('auth-token') ? true : false;
  return (
    <div className="App">
      <Routes>
        <Route  path='/'  element={<PrivateRoute Components={<Home/>} />} />
        <Route path="/login" element={!hasJWT ? <Login /> : <Navigate replace to='/'/>} />
      </Routes>
    </div>
  );
}

export default App;
