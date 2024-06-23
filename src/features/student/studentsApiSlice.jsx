import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { studentApiSlice } from "../../app/api/studentApiSlice";

const studentsAdapter = createEntityAdapter({});

const initialState = studentsAdapter.getInitialState();

export const studentsApiSlice = studentApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedStudents = responseData.map((student) => {
          student.id = student._id;
          return student;
        });
        return studentsAdapter.setAll(initialState, loadedStudents);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Student", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Student", id })),
          ];
        } else return [{ type: "Student", id: "LIST" }];
      },
    }),
    addNewStudent: builder.mutation({
      query: (initialStudentData) => ({
        url: "/students",
        method: "POST",
        body: {
          ...initialStudentData,
        },
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),
    updateStudent: builder.mutation({
      query: (initialStudentData) => ({
        url: "/students",
        method: "PATCH",
        body: {
          ...initialStudentData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: arg.id },
      ],
    }),
    updatePin: builder.mutation({
      query: ({id, pin}) => ({
        url: `/students/addPin/${id}`,
        method: "PATCH",
        body: { id, pin },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: arg.id },
      ],
    }),
    verifyPin: builder.mutation({
      query: ({id, pin}) => ({
        url: "/students/verify-pin",
        method: "POST",
        body: { id, pin },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: arg.id },
      ],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `/students`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddNewStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useUpdatePinMutation,
  useVerifyPinMutation,
} = studentsApiSlice;

// returns the query result object
export const selectStudentsResult =
  studentsApiSlice.endpoints.getStudents.select();

// creates memoized selector
const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  // Pass in a selector that returns the students slice of state
} = studentsAdapter.getSelectors(
  (state) => selectStudentsData(state) ?? initialState
);
