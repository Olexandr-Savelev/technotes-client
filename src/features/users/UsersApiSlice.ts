import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

import { User } from "./types";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `/users`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData: User[]) => {
        const usersList = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        usersAdapter.setAll(initialState, usersList);
        return responseData;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
