import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtbdBaseUrl = process.env.EXPO_PUBLIC_RTDB_URL;

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: rtbdBaseUrl }),
    tagTypes: ["Cart"],
    endpoints: (builder) => ({

        getCartByUser: builder.query({
            query: (userId) => `cart/${userId}.json`,
            transformResponse: (response) => {
                if (!response) return [];
                return Object.entries(response).map(([key, value]) => ({
                    firebaseId: key,
                    ...value,
                }));
            },
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation({
            query: ({ userId, product }) => ({
                url: `cart/${userId}/${product.id}.json`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["Cart"],
        }),

        removeFromCart: builder.mutation({
            query: ({ userId, firebaseId }) => ({
                url: `cart/${userId}/${firebaseId}.json`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

        clearCart: builder.mutation({
            query: (userId) => ({
                url: `cart/${userId}.json`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const { useGetCartByUserQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } = cartApi;
