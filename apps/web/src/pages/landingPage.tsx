import React from 'react'
import { useGetCheckHealthQuery } from '@/services/API'

const LandingPage = () => {
    const {data,error,isLoading} = useGetCheckHealthQuery()
    if(error){
      return <p>something went wrong</p>
    }
    if(isLoading){
      return <p>loading...</p>
    }
  return (  
    <div>LandingPage health {data?.message} ⚡️</div>
  )
}

export default LandingPage