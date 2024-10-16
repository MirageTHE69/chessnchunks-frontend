import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/user/signup-subscriber",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login-with-password",
        method: "POST",
        body: data,
      }),
    }),
    fetchProfileById: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLazyFetchProfileByIdQuery,
  useFetchProfileByIdQuery,
} = userApi;
