import React from 'react'
import { Routes, Route } from 'react-router'
import ProtectedRoute from '@/routes/ProtectedRoute'
import { routerConfig } from '@/routes/routerConfig'


const AppRouter = () => {
  return (
   <Routes>
      {
        routerConfig.map(({Element,isProtected,path})=>{
          if(isProtected){
            return (
              // protected Routes
               <Route element={<ProtectedRoute/>} >
                <Route key={path} path={path} element={<Element/>} />
               </Route>
            )
          }else{
            // Public Routes
           return <Route key={path} path={path} element={<Element/>} />
          }
        })
      }

   </Routes>
  )
}

export default AppRouter