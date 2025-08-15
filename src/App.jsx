import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import HospitalDashboard from './pages/Hospital/HospitalDashboard.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/hospital-dashboard' element={<HospitalDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
