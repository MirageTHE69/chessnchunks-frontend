import { baseApi } from "./baseApi";

export const goalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentWeeklyGoals: builder.query({
      query: () => `/goal/student-weekly-goals`,
    }),
  }),
});

export const { useStudentWeeklyGoalsQuery } = goalApi;
