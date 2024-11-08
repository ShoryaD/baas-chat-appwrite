import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'

import Room from './pages/Room'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
     <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Room/>} />
          </Route>
          
        </Routes>
      </AuthProvider>
     </Router>
    </>
  )
}

export default App
