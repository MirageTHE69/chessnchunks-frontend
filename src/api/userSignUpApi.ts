import { baseApi } from "./baseApi";

const BASE_URL = "/student-signups";

export const userSignUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSignUpById: builder.query({
      query: (id) => `${BASE_URL}/${id}`,
      providesTags: ["UserSignUp"],
    }),
  }),
});

export const { useFetchSignUpByIdQuery } = userSignUpApi;
