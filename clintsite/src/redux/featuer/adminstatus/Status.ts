

import { baseApi } from "../../baseApi";



export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      
      userAdminControl: builder.query({
         query: () => ({
            url: "/stats/user",
            method: "GET",
            
         }),

         providesTags: ["USER"]
         
      }),

      TourAdminControl: builder.query({
         query: () => ({
            url: "/stats/tour",
            method: "GET",

         }),

         providesTags: ["TOUR"]

      }),

      BookingAdminControl: builder.query({
         query: () => ({
            url: "/stats/booking",
            method: "GET",

         }),

         providesTags: ["BOOKING"]

      }),

      PymantAdminControl: builder.query({
         query: () => ({
            url: "/stats/tour",
            method: "GET",

         }),


      }),





   

      
   }),
})

export const { useUserAdminControlQuery,useTourAdminControlQuery,useBookingAdminControlQuery,usePymantAdminControlQuery } = authApi;