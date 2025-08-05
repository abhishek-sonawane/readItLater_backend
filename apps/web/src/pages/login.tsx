import LoginForm from '@/features/auth/components/loginForm'
import React from 'react'

const Login = () => {
  return (
    <div className='flex h-lvh items-center justify-center '>
     
       <div className='w-1/2'>
        <LoginForm/>
       </div>
    </div>
  )
}

export default Login