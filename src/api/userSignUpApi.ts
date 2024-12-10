import { baseApi } from "./baseApi";

const BASE_URL = "/student-signups";

interface CheckoutResponse {
  sessionId: string;
  sessionUrl: string;
}

export const userSignUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSignUpById: builder.query({
      query: (id) => `${BASE_URL}/${id}`,
      providesTags: ["UserSignUp"],
    }),
    createCheckoutSession: builder.mutation<
      CheckoutResponse,
      { programId: string; userEmail: string }
    >({
      query: (body) => ({
        url: `${BASE_URL}/checkout`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchSignUpByIdQuery, useCreateCheckoutSessionMutation } =
  userSignUpApi;
