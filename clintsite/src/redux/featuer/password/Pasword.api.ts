/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";

export const authsPassApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      forgotPassword: builder.mutation({
         query: (payload: { email: string }) => ({
            url: "/auth/forgot-password",
            method: "POST",
            data: payload,
         }),
      }),

      resetPassword: builder.mutation({
         query: (payload: { id: string; token: string; newPassword: string }) => ({
            url: "/auth/reset-password",
            method: "POST",
            data: payload,
         }),
         transformResponse: (response: any) => response.data,
      }),
      changePassword: builder.mutation({
         query: (payload: { oldPassword: string, newPassword: string }) => ({
            url: "/auth/reset-password",
            method: "POST",
            data: payload,
         }),
         transformResponse: (response: any) => response.data,
      }),

   


      setPassword: builder.mutation({
         query: (payload: { password: string }) => ({
            url: "/auth/set-password",
            method: "POST",
            data: payload,
         }),
      }),

   }),
});

export const {
   useResetPasswordMutation,
   useForgotPasswordMutation,
   useChangePasswordMutation,
   useSetPasswordMutation,
} = authsPassApi;
