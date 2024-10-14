import { baseApi } from "./baseApi";

export const batchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchBatchForOptions: builder.query({
      query: () => `/batch/options`,
      providesTags: ["AllBatchesOptions"],
    }),
  }),
});

export const { useFetchBatchForOptionsQuery } = batchApi;
