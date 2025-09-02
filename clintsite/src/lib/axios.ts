import axios from "axios";
import config from "../config";

export const axiosInstance = axios.create({
   baseURL: config.baseUrl,
   withCredentials: true
   
 
}) 





axiosInstance.interceptors.request.use(function (config) {
   
   return config;
}, function (error) {
   
   return Promise.reject(error);
},
   
);


axios.interceptors.response.use(function onFulfilled(response) {


   return response;
}, function onRejected(error) {

   return Promise.reject(error);
});
