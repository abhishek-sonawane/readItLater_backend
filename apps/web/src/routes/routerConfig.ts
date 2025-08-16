import Login from "@/pages/login"
import Register from "@/pages/register"
import LandingPage from "@/pages/landingPage"
import Profile from "@/pages/profile"
import DashBoard from "@/pages/dashBoard"

export const routerConfig = [
    {
        path: '/',
        Element : LandingPage,
        isProtected :false,
        isAuth: false
    },
    {
        path: '/register',
        Element : Register,
        isProtected :false,
         isAuth: true
    },
    {
        path: '/login',
        Element : Login,
        isProtected :false,
         isAuth: true
    },
     {
        path: '/dashboard',
        Element : DashBoard,
        isProtected :true
    },
    {
        path: '/user/profile',
        Element : Profile,
        isProtected :true
    }
]