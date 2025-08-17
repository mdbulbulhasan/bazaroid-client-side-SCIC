import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `https://bazaroid-server-side.vercel.app`,
});

const useAxiosSecure = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      const interceptor = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Clean up the interceptor when user changes/unmount
      return () => {
        axiosSecure.interceptors.request.eject(interceptor);
      };
    }
  }, [user, loading]);

  return axiosSecure;
};

export default useAxiosSecure;
