// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const createNodeApi = createApi({
  reducerPath: "createNode",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    createNode: builder.mutation({
      query: (node) => {
        return {
          url: "nodes/create",
          body: node,
          method: "POST",
        };
      },
    }),
    getUserInfo: builder.query({
      query: (userId) => `users/${userId}`,
    }),
  }),
});

export const { useCreateNodeMutation, useGetUserInfoQuery } = createNodeApi;
