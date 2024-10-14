import { baseApi } from "./baseApi";

export const goalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentWeeklyGoals: builder.query({
      query: () => `/goal/student-weekly-goals`,
    }),
    fetchAllSeasonalGoals: builder.query({
      query: () => "/goal/seasonal-goals",
      providesTags: ["SeasonalGoals"],
    }),
    fetchAllWeeklyGoals: builder.query({
      query: () => "/goal/weekly-goals",
      providesTags: ["WeeklyGoals"],
    }),
  }),
});

export const {
  useStudentWeeklyGoalsQuery,
  useFetchAllSeasonalGoalsQuery,
  useFetchAllWeeklyGoalsQuery,
} = goalApi;
