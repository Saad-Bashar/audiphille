import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://103.28.121.57/api/" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => `products`,
        }),
    })
})

export const { useGetAllProductsQuery } = productsApi