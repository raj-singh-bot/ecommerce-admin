import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Components}:any) => {
    const hasJWT = localStorage.getItem('auth-token') ? true : false;
    if(!hasJWT){
        return <Navigate to="/login" />
    }
  return Components
}

export default PrivateRoute