import { baseApi } from "./baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllStudents: builder.query({
      query: (batchId) => `/student/all-students-from-batch?batchId=${batchId}`,
      providesTags: ["AllBatchesOptions"],
    }),
  }),
});

export const { useLazyFetchAllStudentsQuery } = studentApi;
