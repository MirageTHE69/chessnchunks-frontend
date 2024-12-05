import { baseApi } from "./baseApi";
import { CalendarEvent } from "@/types/calendar";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllEvents: builder.query<CalendarEvent[], void>({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
  }),
});

export const { useFetchAllEventsQuery } = eventApi;
