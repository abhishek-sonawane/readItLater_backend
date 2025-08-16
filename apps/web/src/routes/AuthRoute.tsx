import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router'

const AuthRoute = () => {
   const {loggedIn} = useAuth()

    if(loggedIn) return <Navigate  to='/dashboard' replace />
    return <Outlet/>
}

export default AuthRoute