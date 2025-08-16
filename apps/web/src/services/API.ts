import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const readItLaterAPI = createApi({
    reducerPath:'readItLaterAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/v1/',
    }),
    endpoints:(builder)=>({
        getCheckHealth : builder.query({query:()=>"health"}) 
    })
})

export const {useGetCheckHealthQuery} = readItLaterAPI