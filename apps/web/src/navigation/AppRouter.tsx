import React from 'react'
import { Routes, Route } from 'react-router'
import ProtectedRoute from '@/navigation/ProtectedRoute'

const AppRouter = () => {
  return (
   <Routes>
      <Route path='/' element={<>homepage</>} />
      <Route path='/login' element={<>login page</>} />
      <Route path='/register' element={<>register page</>} />
      <Route path='/*' element={<>404</>}/>


      {/* protected routes */}
        <Route element={<ProtectedRoute/>} >
         <Route path='/dashboard' element={<div>dashboard</div>} />
        <Route path='/profile' element={<div>profile</div>} />
        <Route path='/feed' element={<div>feed</div>} />
        </Route>
      {/* protected routes */}

   </Routes>
  )
}

export default AppRouter