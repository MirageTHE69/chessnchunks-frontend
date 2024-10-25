import { baseApi } from "./baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllTasks: builder.query({
      query: () => `/tasks`,
    }),
  }),
});

export const { useFetchAllTasksQuery } = taskApi;
