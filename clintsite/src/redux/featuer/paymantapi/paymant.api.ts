



import { baseApi } from "../../baseApi";



export const paymantApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({


      



      getPaymantTypes: builder.query({
         query: () => ({
            url: "/booking/my-bookings", 
            method: "GET",

         }),

         

         transformResponse: (response) => response.data

      }),
      getSingleBooking: builder.query({
         query: (bookingId: string) => ({
            url: `/booking/${bookingId}`,   // ✅ Direct parameter in URL
            method: "GET",
         }),
         providesTags: ['BOOKING'],
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         transformResponse: (response: any) => response.data,
      }),




   }),
})

export const { useGetPaymantTypesQuery, useGetSingleBookingQuery} = paymantApi;

