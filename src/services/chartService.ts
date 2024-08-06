import { Areas, Creators, Preclassifier, Weeks } from "../data/charts/charts";
import { apiSlice } from "./apiSlice";

export const chartService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPreclassifiersChartData: builder.mutation<Preclassifier[], string>({
      query: (siteId) => `/card/site/preclassifiers/${siteId}`,
      transformResponse: (response: { data: Preclassifier[] }) => response.data,
    }),
    getMethodologiesChartData: builder.mutation<Preclassifier[], string>({
      query: (siteId) => `/card/site/methodologies/${siteId}`,
      transformResponse: (response: { data: Preclassifier[] }) => response.data,
    }),
    getAreasChartData: builder.mutation<Areas[], string>({
      query: (siteId) => `/card/site/areas/${siteId}`,
      transformResponse: (response: { data: Areas[] }) => response.data,
    }),
    getCreatorsChartData: builder.mutation<Creators[], string>({
      query: (siteId) => `/card/site/creators/${siteId}`,
      transformResponse: (response: { data: Creators[] }) => response.data,
    }),
    getWeeksChartData: builder.mutation<Weeks[], string>({
      query: (siteId) => `/card/site/weeks/${siteId}`,
      transformResponse: (response: { data: Weeks[] }) => response.data,
    }),
  }),
});

export const {
  useGetAreasChartDataMutation,
  useGetCreatorsChartDataMutation,
  useGetPreclassifiersChartDataMutation,
  useGetWeeksChartDataMutation,
  useGetMethodologiesChartDataMutation,
} = chartService;
