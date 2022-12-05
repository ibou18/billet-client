import { api } from "../authApi";

export const authAction = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "GET",
      }),
    }),
    verifyToken: builder.query({
      query: (token) => ({
        url: `/users/checkdemandeur/${token}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
  useLogoutMutation,
} = authAction;
