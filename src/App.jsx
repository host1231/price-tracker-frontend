import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import { AuthProvider } from './context/AuthContext'
import TransactionProvider from './context/TransactionContext'

const App = () => {
  return (
    <>
      <AuthProvider>
        <TransactionProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Root />} />
              <Route path='/dashboard' element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
            </Routes>
          </Router>
        </TransactionProvider>
      </AuthProvider>
    </>
  )
}

export default App

const Root = () => {
  const token = localStorage.getItem('token');

  return token ? (
    <Navigate to='/dashboard' replace />
  ) : (
    <Navigate to='/login' replace />
  )
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to='/login' replace />
}
