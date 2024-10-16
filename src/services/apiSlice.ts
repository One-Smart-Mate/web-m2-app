import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://service-m2-development.up.railway.app", credentials: 'same-origin' }),
  tagTypes: ["User"],
  endpoints: (_) => ({}),
});
