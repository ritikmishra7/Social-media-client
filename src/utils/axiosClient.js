import axios from 'axios';
import { ACCESS_TOKEN_KEY,setItem ,getItem, removeItem } from './localStorageManager';
export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
})


//Interceptors
axiosClient.interceptors.request.use(

    (request) => {
        const accessToken = getItem(ACCESS_TOKEN_KEY);
        request.headers['Authorization'] = `Bearer ${accessToken}`;

        return request;
    }

);

axiosClient.interceptors.response.use(

   async (response) => {
        const data = response.data;

        if(data.status === 'ok')
        return data;


        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.error;


        if(statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`) //means the refresh token has expired
        {
            removeItem(ACCESS_TOKEN_KEY);
            window.location.replace('/auth/login', '_self');
            return Promise.reject(error);
        }

        if(statusCode === 401) {    //get new accessToken from refresh api as access token has expired
            const response = await axios.create({
                withCredentials: true
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
            if(response.status === 'ok'){
                setItem(ACCESS_TOKEN_KEY, response.result.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;

                return axios(originalRequest);
            }
        }

        return Promise.reject(error);

    }
);