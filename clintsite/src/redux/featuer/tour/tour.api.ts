


import { baseApi } from "../../baseApi";



export const tourApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      


      

      addTourType: builder.mutation({
         query: (userInfo) => ({
            url: "/tour/create-tour-type",
            method: "POST",
            data: userInfo,
         }),

         invalidatesTags: ["TOUR"]
      }),

      getTourTypes: builder.query({
         query: () => ({
            url: "/tour/tour-types",
            method: "GET",
            
         }),

         providesTags: ["TOUR"],

         transformResponse:(response)=> response.data

      }),

      DeletTourType: builder.mutation({
         query: (userInfo) => ({
            url: "/tour/create-tour-type",
            method: "DELET",
            data: userInfo,
         }),

         invalidatesTags: ["TOUR"]
      }),

   }),
})

export const {useAddTourTypeMutation,useGetTourTypesQuery,useDeletTourTypeMutation} = tourApi;