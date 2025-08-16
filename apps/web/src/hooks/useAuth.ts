import { useEffect, useState } from "react"

export const useAuth = ()=>{
    // loggedIn State
    const [loggedIn,setLoggedIn] = useState(JSON.parse(localStorage.getItem('login')) ||false)
    console.log('login state=>',loggedIn)
    console.log('stored state',localStorage.getItem('login'))

   useEffect(()=>{
     const loggedInState = localStorage.getItem('login')=='true'
     setLoggedIn(loggedInState)
   },[])
    

    return {loggedIn}
}