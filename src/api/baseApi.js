import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../baseUrl";

const baseApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApi;
