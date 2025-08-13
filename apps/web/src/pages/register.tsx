import RegisterForm from '@/features/auth/components/RegisterForm'
import React from 'react'

const Register = () => {
  return (
    <div className='flex h-lvh items-center justify-center '>
     <div className='w-1/2'>
       <RegisterForm />
     </div>
    </div>
  )
}

export default Register