import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

import { Note } from "./types";
import { RootState } from "../../app/store";

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<EntityState<unknown>, void>({
      query: () => ({
        url: `/notes`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response: Note[], meta) => {
        const notesList = response.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, notesList);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              ...result.ids.map((id) => ({ type: "Notes", id } as const)),
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
    }),
  }),
});

export const { useGetNotesQuery } = notesApiSlice;

const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors<RootState>(
  (state) => selectNotesData(state) ?? initialState
);
