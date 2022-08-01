import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../utils/constant'

export const eCommerceApi = createApi({
  reducerPath: 'eCommerceApi',

  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: `/auth`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
    }),

    register: builder.mutation({
      query: data => {
        return {
          url: `/register`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
    }),

    placeOrder: builder.mutation({
      query: data => {
        return {
          url: `/order`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
    }),

    products: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    getProductById: builder.query({
      query: id => `/product?product=${id}`,
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useProductsQuery,
  useGetProductByIdQuery,
  usePlaceOrderMutation,
} = eCommerceApi
