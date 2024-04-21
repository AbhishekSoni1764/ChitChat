/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { useContext } from 'react'
import { LoginContext } from './context/LoginContext'

function App() {

  const activeUser = useContext(LoginContext);

  const ProtectedRoute = ({ children }) => {
    if (!activeUser) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
