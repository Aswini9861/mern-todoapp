import React from 'react'
import Profile from './profile'
import { Route,Routes } from 'react-router-dom'
import Login from './auth/login'
import Register from './auth/register'
const Index = () => {
  return (
    <div>
        <Routes>
    <Route path='/' element={<Profile/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Register/>}/>

    </Routes>
    </div>
  )
}

export default Index