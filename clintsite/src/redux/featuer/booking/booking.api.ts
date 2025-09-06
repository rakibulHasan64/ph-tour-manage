

import { baseApi } from "../../baseApi";



export const bookingApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      

      creatBooking: builder.mutation({
         query: (bookingData) => ({
            url: "/booking",
            method: "POST",
            data: bookingData,
         }),
         invalidatesTags: ["BOOKING"],
      }),
      


      getTourTypes: builder.query({
         query: () => ({
            url: "/tour/tour-types",
            method: "GET",
            
         }),

         providesTags: ["TOUR"],

         transformResponse:(response)=> response.data

      }),

      removeTourType: builder.mutation({
         query: (tourTypeId) => ({
            url: `/tour/tour-types/${tourTypeId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["TOUR"],
      }),

      


   }),
})

export const {useCreatBookingMutation } = bookingApi;