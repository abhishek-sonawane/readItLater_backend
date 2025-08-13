import { API_BASE_URL } from '@/config/api';
import axios from 'axios'

export const getAxios = ()=>{
    const instance = axios.create();
    instance.defaults.baseURL = API_BASE_URL;

    instance.interceptors.request.use(
        // res
        (config)=>{
            const token = localStorage.getItem('token')
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        // rej err
        (error)=>{
            console.log('Request Error ->',error)
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
          (response)=>{
            return response
        },
        // rej err
        (error)=>{
           console.log('Response Error ->',error)
           return Promise.reject(error)
        }
    )

    return instance
}