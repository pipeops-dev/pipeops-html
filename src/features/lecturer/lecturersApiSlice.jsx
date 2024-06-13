import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { lecturerApiSlice } from "../../app/api/lecturerApiSlice";

const lecturersAdapter = createEntityAdapter({});

const initialState = lecturersAdapter.getInitialState();

export const lecturersApiSlice = lecturerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLecturers: builder.query({
      query: () => "/lecturers",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedLecturers = responseData.map((lecturer) => {
          lecturer.id = lecturer._id;
          return lecturer;
        });
        return lecturersAdapter.setAll(initialState, loadedLecturers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Lecturer", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Lecturer", id })),
          ];
        } else return [{ type: "Lecturer", id: "LIST" }];
      },
    }),
    
    addNewLecturer: builder.mutation({
      query: (initialLecturerData) => ({
        url: "/lecturers",
        method: "POST",
        body: {
          ...initialLecturerData,
        },
      }),
      invalidatesTags: [{ type: "Lecturer", id: "LIST" }],
    }),
    updateLecturer: builder.mutation({
      query: (initialLecturerData) => ({
        url: "/lecturers",
        method: "PATCH",
        body: {
          ...initialLecturerData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lecturer", id: arg.id },
      ],
    }),
    updateCode: builder.mutation({
      query: ({ id, universityCode }) => ({
        url: `/lecturers/addUniversityCode/${id}`,
        method: "PATCH",
        body: { id, universityCode },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lecturer", id: arg.id },
      ],
    }),
    deleteLecturer: builder.mutation({
      query: ({ id }) => ({
        url: `/lecturers`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lecturer", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetLecturersQuery,
  useAddNewLecturerMutation,
  useUpdateLecturerMutation,
  useDeleteLecturerMutation,
  useUpdateCodeMutation,
} = lecturersApiSlice;

// returns the query result object
export const selectLecturersResult =
  lecturersApiSlice.endpoints.getLecturers.select();

// creates memoized selector
const selectLecturersData = createSelector(
  selectLecturersResult,
  (lecturersResult) => lecturersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllLecturers,
  selectById: selectLecturerById,
  selectIds: selectLecturerIds,
  // Pass in a selector that returns the lecturers slice of state
} = lecturersAdapter.getSelectors(
  (state) => selectLecturersData(state) ?? initialState
);
