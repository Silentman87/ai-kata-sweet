import { useState } from 'react'
import './App.css'
import {Route , Routes, BrowserRouter} from 'react-router-dom'
import Login  from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path = '/home' element = {<Home/>} />
        <Route path = '/' element = {<Login />} />
        <Route path = '/register' element = {<Register />} />
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
