import { Card } from "../data/card/card";
import { apiSlice } from "./apiSlice";

export const cardService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.mutation<Card[], string>({
      query: (siteId) => `/card/all/${siteId}`,
      transformResponse: (response: { data: Card[] }) => response.data,
    }),
  }),
});

export const { useGetCardsMutation } = cardService;
