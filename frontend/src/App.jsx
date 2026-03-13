import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import LeaveTypes from './pages/LeaveTypes'
import ApplyLeave from './pages/ApplyLeave'
import ManageLeaves from './pages/ManageLeaves'
import MyLeaves from './pages/MyLeaves'
import AdminLeaves from './pages/AdminLeaves'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />


        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/apply-leave' element={
          <ProtectedRoute>
            <ApplyLeave />
          </ProtectedRoute>
        } />

        <Route path='/my-leaves' element={
          <ProtectedRoute>
            <MyLeaves />
          </ProtectedRoute>
        } />

        <Route path='/employees' element={
          <ProtectedRoute adminOnly={true}>
            <Employees />
          </ProtectedRoute>
        } />

        <Route path='/leave-types' element={
          <ProtectedRoute adminOnly={true}>
            <LeaveTypes />
          </ProtectedRoute>
        } />

        <Route path='/manage-leaves' element={
          <ProtectedRoute adminOnly={true}>
            <ManageLeaves />
          </ProtectedRoute>
        } />

        <Route path='/admin/leaves' element={
          <ProtectedRoute adminOnly={true}>
            <AdminLeaves />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App