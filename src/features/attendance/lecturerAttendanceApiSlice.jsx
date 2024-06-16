import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { lecturerApiSlice } from "../../app/api/lecturerApiSlice"

const lecturerAttendanceAdapter = createEntityAdapter({})

const initialState = lecturerAttendanceAdapter.getInitialState()

export const lecturerAttendanceApiSlice = lecturerApiSlice.injectEndpoints({
    endpoints: builder => ({
        getLecturerAttendance: builder.query({
            query: () => '/attendance',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedLecturerAttendance = responseData.map(attendance => {
                    attendance.id = attendance._id
                    return attendance
                });
                return lecturerAttendanceAdapter.setAll(initialState, loadedLecturerAttendance)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Attendance', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Attendance', id }))
                    ]
                } else return [{ type: 'Attendance', id: 'LIST' }]
            }
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
                url: '/lecturerAttendance',
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
                url: `/lecturerAttendance`,
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
    useGetLecturerAttendanceQuery,
    useAddNewAttendanceMutation,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = lecturerAttendanceApiSlice

// returns the query result object
export const selectLecturerAttendanceResult = lecturerAttendanceApiSlice.endpoints.getLecturerAttendance.select()

// creates memoized selector
const selectLecturerAttendanceData = createSelector(
    selectLecturerAttendanceResult,
    lecturerAttendanceResult => lecturerAttendanceResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLecturerAttendance,
    selectById: selectAttendanceById,
    selectIds: selectAttendanceIds
    // Pass in a selector that returns the lecturerAttendance slice of state
} = lecturerAttendanceAdapter.getSelectors(state => selectLecturerAttendanceData(state) ?? initialState)