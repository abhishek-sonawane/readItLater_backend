import { readItLaterAPI } from '@/services/API'
import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer:{
        [readItLaterAPI.reducerPath] : readItLaterAPI.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(readItLaterAPI.middleware),
})

setupListeners(store.dispatch)