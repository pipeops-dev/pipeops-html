import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const attendancesAdapter = createEntityAdapter({})

const initialState = attendancesAdapter.getInitialState()

export const attendancesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAttendances: builder.query({
            query: () => '/attendance',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAttendances = responseData.map(attendance => {
                    attendance.id = attendance._id
                    return attendance
                });
                return attendancesAdapter.setAll(initialState, loadedAttendances)
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
                url: '/attendances',
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
                url: '/attendances',
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
                url: `/attendances`,
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
    useGetAttendancesQuery,
    useAddNewAttendanceMutation,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = attendancesApiSlice

// returns the query result object
export const selectAttendancesResult = attendancesApiSlice.endpoints.getAttendances.select()

// creates memoized selector
const selectAttendancesData = createSelector(
    selectAttendancesResult,
    attendancesResult => attendancesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAttendances,
    selectById: selectAttendanceById,
    selectIds: selectAttendanceIds
    // Pass in a selector that returns the attendances slice of state
} = attendancesAdapter.getSelectors(state => selectAttendancesData(state) ?? initialState)