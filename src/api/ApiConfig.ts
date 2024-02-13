import axios, { type InternalAxiosRequestConfig } from 'axios';
import { parseJSON } from '../hooks/useLocalStorage.ts';

const AXIOS_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL,
};

const axiosApiInstance = axios.create(AXIOS_CONFIG);

const getToken = () => {
    try {
        const token = window.localStorage.getItem('token');
        return token && parseJSON(token);
    } catch (error) {
        throw new Error(`Error getting token ${error}`);
    }
};

const setToken = (token: string) => {
    try {
        return window.localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
        throw new Error(`Error setting token ${error}`);
    }
};

const refreshToken = async (): Promise<string> => {
    try {
        const { data } = await axiosApiInstance.get('/refresh_token');
        return data;
    } catch (e) {
        throw new Error('Refresh Token Error');
    }
};

const onFulfilled = (config: InternalAxiosRequestConfig) => {
    const authToken = getToken();

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
};

axiosApiInstance.interceptors.request.use(onFulfilled, async (error) => {
    const { response, config } = error;

    if (response.status === 401) {
        const newToken = await refreshToken();

        setToken(newToken);

        // Retry the original request
        return axios(config);
    }

    return Promise.reject(error);
});

export {
    axiosApiInstance,
};