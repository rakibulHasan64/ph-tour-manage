


import type { IResponse } from "../../../types/auth.type";
import type { ITourPackage } from "../../../types/tour.type";
import { baseApi } from "../../baseApi";



export const tourApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      

      addTour: builder.mutation({
         query: (tourData) => ({
            url: "/tour/create",
            method: "POST",
            data: tourData,
         }),
         invalidatesTags: ["TOUR"],
      }),
      

      addTourType: builder.mutation({
         query: (userInfo) => ({
            url: "/tour/create-tour-type",
            method: "POST",
            data: userInfo,
         }),

         invalidatesTags: ["TOUR"]
      }),

      getTourTypes: builder.query({
         query: (params) => ({
            url: "/tour/tour-types",
            method: "GET",
            params
            
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

      getAllTours: builder.query<ITourPackage[], unknown>({
         query: (params) => ({
            url: "/tour",
            method: "GET",
            params: params,
         }),
         providesTags: ["TOUR"],
         transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
      }),


   }),
})

export const {useAddTourTypeMutation,useGetTourTypesQuery,useRemoveTourTypeMutation,useAddTourMutation,useGetAllToursQuery} = tourApi;