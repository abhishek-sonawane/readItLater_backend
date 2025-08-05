import Login from "@/pages/login"
import Register from "@/pages/register"
import LandingPage from "@/pages/landingPage"
import Profile from "@/pages/profile"

export const routerConfig = [
    {
        path: '/',
        Element : LandingPage,
        isProtected :false
    },
    {
        path: '/register',
        Element : Register,
        isProtected :false
    },
    {
        path: '/login',
        Element : Login,
        isProtected :false
    },
    {
        path: '/user/profile',
        Element : Profile,
        isProtected :true
    }
]