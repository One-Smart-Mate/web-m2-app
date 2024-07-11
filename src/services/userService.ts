import { Responsible, UserTable, UserUpdateForm } from "../data/user/user";
import { CreateUser, UpdateUser } from "../data/user/user.request";
import { apiSlice } from "./apiSlice";

export const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation<UserTable[], void>({
      query: () => `/users/all`,
      transformResponse: (response: { data: UserTable[] }) => response.data,
    }),
    getSiteResponsibles: builder.mutation<Responsible[], void>({
      query: (siteId) => `/users/all/${siteId}`,
      transformResponse: (response: { data: Responsible[] }) => response.data,
    }),
    createUser: builder.mutation<void, CreateUser>({
      query: (user) => ({
        url: "/users/create",
        method: "POST",
        body: { ...user },
      }),
    }),
    getUser: builder.mutation<UserUpdateForm, string>({
      query: (id) => `/users/user/${id}`,
      transformResponse: (response: { data: UserUpdateForm }) => response.data,
    }),
    updateUser: builder.mutation<void, UpdateUser>({
      query: (user) => ({
        url: "/users/update",
        method: "PUT",
        body: { ...user },
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useGetSiteResponsiblesMutation,
  useCreateUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
} = userService;
