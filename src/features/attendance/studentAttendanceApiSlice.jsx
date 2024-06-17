import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { studentApiSlice } from "../../app/api/studentApiSlice"

const studentAttendanceAdapter = createEntityAdapter({})

const initialState = studentAttendanceAdapter.getInitialState()

export const studentAttendanceApiSlice = studentApiSlice.injectEndpoints({
  endpoints: builder => ({
      getStudentAttendance: builder.query({
          query: ({id}) => ({
              url: `/attendance/${id}`,
              validateStatus: (response, result) => {
                  return response.status === 200 && !result.isError
              },
          }),
          transformResponse: responseData => {
              const loadedStudentAttendance = responseData.students.map(attendance => {
                  attendance.id = attendance._id
                  return attendance
              });
              return studentAttendanceAdapter.setAll(initialState, loadedStudentAttendance)
          },
         
          
      }),
      addNewAttendance: builder.mutation({
          query: initialAttendanceData => ({
              url: '/attendance',
              method: 'POST',
              body: {
                  ...initialAttendanceData,
              }
          }),
          invalidatesTags: [
              { type: 'Attendance', id: "LIST" }
          ]
      }),
      updateAttendance: builder.mutation({
          query: initialAttendanceData => ({
              url: '/attendance',
              method: 'PATCH',
              body: {
                  ...initialAttendanceData,
              }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Attendance', id: arg.id }
          ]
      }),
      deleteAttendance: builder.mutation({
          query: ({ id }) => ({
              url: `/studentAttendance`,
              method: 'DELETE',
              body: { id }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Attendance', id: arg.id }
          ]
      }),
  }),
})

export const {
  useGetStudentAttendanceQuery,
  useAddNewAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = studentAttendanceApiSlice

// returns the query result object
export const selectStudentAttendanceResult = studentAttendanceApiSlice.endpoints.getStudentAttendance.select()

// creates memoized selector
const selectStudentAttendanceData = createSelector(
  selectStudentAttendanceResult,
  studentAttendanceResult => studentAttendanceResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStudentAttendance,
  selectById: selectAttendanceById,
  selectIds: selectAttendanceIds
  // Pass in a selector that returns the studentAttendance slice of state
} = studentAttendanceAdapter.getSelectors(state => selectStudentAttendanceData(state) ?? initialState)