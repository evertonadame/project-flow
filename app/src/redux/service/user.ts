// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data: { name: string; email: string; password: string }) => {
        return {
          url: "users/register",
          body: data,
          method: "POST",
        };
      },
    }),
    userLogin: builder.mutation({
      query: (data: { email: string; password: string }) => {
        return {
          url: "auth/login",
          body: data,
          method: "POST",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useCreateUserMutation, useUserLoginMutation } = userApi;
