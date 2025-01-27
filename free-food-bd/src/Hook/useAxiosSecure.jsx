import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Provider/useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // Response Interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("Error from axios interceptor", error.response);
      if (error.response?.status === 401 || error.response?.status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  // Request Interceptor (optional, if needed)
  axiosSecure.interceptors.request.use(
    (config) => {
      // You can add headers or manipulate config before the request is sent
      console.log("Request Interceptor triggered");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
