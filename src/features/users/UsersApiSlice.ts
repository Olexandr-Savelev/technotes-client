import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

import { User } from "./types";
import { RootState } from "../../app/store";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<unknown>, void>({
      query: () => ({
        url: `/users`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response: User[], meta) => {
        const usersList = response.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, usersList);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Users", id } as const)),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors<RootState>(
  (state) => selectUsersData(state) ?? initialState
);
