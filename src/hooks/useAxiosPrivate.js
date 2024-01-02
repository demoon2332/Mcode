import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import {useAuth} from '../context/AuthProvider';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        console.log("Start useAxios useEffect")
        // Add a new request interceptor
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                if (!config.headers['x_authorization']) {
                    config.headers['x_authorization'] = `${auth?.accessToken}`;
                }
                console.log("tis is request intercet")
                return config;
            },
            error => Promise.reject(error)
        );

        // Add a new response interceptor
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            
            async error => {
                const prevRequest = error?.config;

                // case when token is expired (401)
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['x_authorization'] = `${newAccessToken}`;
                    console.log("resentttt")
                    return axiosPrivate(prevRequest);
                }
                console.log("tis is response intercet")
                return Promise.reject(error);
            }
        );
        
        console.log("after comment all config")
        return () => {
            // Eject only the interceptors added in this effect
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [axiosPrivate, auth, refresh]);
// 28/12/2023 dependency array: [axiosPrivate, auth, refresh]

    console.log("Axious private after setting");
    console.log(axiosPrivate.interceptors);
    return axiosPrivate;
};

export default useAxiosPrivate;