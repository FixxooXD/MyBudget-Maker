import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoues = (props) => {
    const {Component} = props
    const navigate = useNavigate();

    let isAuthenticated = useSelector((state) => state.user.authenticated);

     useEffect(() => {
       if(!isAuthenticated){
         navigate("/auth/login")
       }
     })
  return (
    <Component />
  )
}

export default ProtectedRoues