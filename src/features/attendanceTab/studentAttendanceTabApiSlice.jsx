import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { studentApiSlice } from "../../app/api/studentApiSlice"

const studentAttendanceTabAdapter = createEntityAdapter({})

const initialState = studentAttendanceTabAdapter.getInitialState()

export const studentAttendanceTabApiSlice = studentApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAttendanceTab: builder.query({
            query: (studentId) => ({
                url: `/attendanceTab/student/${studentId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedStudentAttendanceTab = responseData.map(attendanceTab => {
                    attendanceTab.id = attendanceTab._id
                    return attendanceTab
                });
                return studentAttendanceTabAdapter.setAll(initialState, loadedStudentAttendanceTab)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'AttendanceTab', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'AttendanceTab', id }))
                    ]
                } else return [{ type: 'AttendanceTab', id: 'LIST' }]
            }
        }),

        calculateAttendanceTab: builder.mutation({
            query: ({id , attendanceCode}) => ({
              url: '/attendanceTab/student',
              method: 'PATCH',
              body: { id, attendanceCode }
            }),
            invalidatesTags: [{ type: 'AttendanceTab', id: 'LIST' }],
          }),
       
        updateAttendanceTab: builder.mutation({
            query: ({id , attendanceCode}) => ({
              url: '/attendanceTab/student',
              method: 'PATCH',
              body: { id, attendanceCode }
            }),
            invalidatesTags: [{ type: 'AttendanceTab', id: 'LIST' }],
          }),
        
    }),
})

export const {
    useGetAttendanceTabQuery,
    useUpdateAttendanceTabMutation,
} = studentAttendanceTabApiSlice

// returns the query result object
export const selectStudentAttendanceTabResult = studentAttendanceTabApiSlice.endpoints.getAttendanceTab.select()

// creates memoized selector
const selectStudentAttendanceTabData = createSelector(
    selectStudentAttendanceTabResult,
    studentAttendanceTabResult => studentAttendanceTabResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStudentAttendanceTab,
    selectById: selectAttendanceTabById,
    selectIds: selectAttendanceTabIds
    // Pass in a selector that returns the studentAttendanceTab slice of state
} = studentAttendanceTabAdapter.getSelectors(state => selectStudentAttendanceTabData(state) ?? initialState)