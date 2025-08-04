import { useEffect, useState } from "react"

export const useAuth = ()=>{
    // loggedIn State
    const [loggedIn,setLoggedIn] = useState(false)

   useEffect(()=>{
     const loggedInState = localStorage.getItem('login')==='true'
     setLoggedIn(loggedInState)
   },[])
    

    return {loggedIn}
}