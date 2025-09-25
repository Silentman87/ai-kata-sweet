import { useState } from 'react'
import './App.css'
import {Route , Routes , BrowserRouter} from 'react-router-dom'

import { AuthProvider } from './context/authContext';
import Login  from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import AdminDashboard from './Admin/Dashboard';
import UserDashboard from './User/Dashboard';
import ProtectedRoute from './components/ProjectedRoute'
import Home from './Pages/Home';

function App() {
  

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admindashboard' element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path='/userdashboard' element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
