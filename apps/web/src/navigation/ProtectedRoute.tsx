import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
   const {loggedIn} = useAuth()

    if(!loggedIn) return <Navigate  to='/login' replace />
    return <Outlet/>
}

export default ProtectedRoute