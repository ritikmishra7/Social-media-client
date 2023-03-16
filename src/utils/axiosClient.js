import axios from 'axios';
import { ACCESS_TOKEN_KEY, setItem, getItem, removeItem } from './localStorageManager';
import store from '../redux/store';
import { setLoading, settoastData } from '../internal';

let baseURL = 'http://localhost:4000/';

if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}


export const axiosClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

//Interceptors
axiosClient.interceptors.request.use(

    (request) => {
        if (request.url !== '/user/searchUser')
            store.dispatch(setLoading(true));

        const accessToken = getItem(ACCESS_TOKEN_KEY);
        request.headers['Authorization'] = `Bearer ${accessToken}`;

        return request;
    }

);

axiosClient.interceptors.response.use(

    async (response) => {
        const data = response.data;
        store.dispatch(setLoading(false));
        if (data.status === 'ok') {
            return data;
        }


        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.error;

        if (error !== 'Invalid access key')
            store.dispatch(settoastData({ type: 'error', message: error }));

        if (statusCode === 401 && originalRequest.url === '/auth/refresh') //means the refresh token has expired
        {
            removeItem(ACCESS_TOKEN_KEY);
            window.location.replace('/auth/login', '_self');
            return Promise.reject(error);
        }

        if (statusCode === 401) {    //get new accessToken from refresh api as access token has expired
            const responseFromrefresh = await axios.create({
                withCredentials: true
            }).get(`${baseURL}auth/refresh`);

            if (responseFromrefresh.data.status === 'ok') {
                setItem(ACCESS_TOKEN_KEY, responseFromrefresh.data.result.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${responseFromrefresh.data.result.accessToken}`;
                return axiosClient(originalRequest);
            }
            else {
                removeItem(ACCESS_TOKEN_KEY);
                window.location.replace('/auth/login', '_self');
                return Promise.reject(error);
            }

        }

        return Promise.reject(error);

    }, async (error) => {
        store.dispatch(setLoading(false));
        store.dispatch(settoastData({ type: 'error', message: error }));
        return Promise.reject(error);
    }
);