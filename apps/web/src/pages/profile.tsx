import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router'

const Profile = () => {
  const navigate = useNavigate()
  const handleLogout =()=>{
    localStorage.removeItem('login')
    navigate('/login')
  }
  return (
    <div>
<p>profile</p>
      <Button onClick={handleLogout} >logout</Button>
    </div>
  )
}

export default Profile