import { CardInterface } from "../data/card/card";
import { apiSlice } from "./apiSlice";

export const cardService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.mutation<CardInterface[], string>({
      query: (siteId) => `/card/all/${siteId}`,
      transformResponse: (response: { data: CardInterface[] }) => response.data,
    }),
    getCardDetails: builder.mutation<CardInterface, string>({
      query: (id) => `/card/${id}`,
      transformResponse: (response: { data: CardInterface }) => response.data,
    }),
  }),
});

export const { useGetCardsMutation, useGetCardDetailsMutation } = cardService;
