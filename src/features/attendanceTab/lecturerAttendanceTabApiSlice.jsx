import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { lecturerApiSlice } from "../../app/api/lecturerApiSlice"

const lecturerAttendanceTabAdapter = createEntityAdapter({})

const initialState = lecturerAttendanceTabAdapter.getInitialState()

export const lecturerAttendanceTabApiSlice = lecturerApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAttendanceTab: builder.query({
            query: (lecturerId) => ({
                url: `/attendanceTab/${lecturerId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedLecturerAttendanceTab = responseData.map(attendanceTab => {
                    attendanceTab.id = attendanceTab._id
                    return attendanceTab
                });
                return lecturerAttendanceTabAdapter.setAll(initialState, loadedLecturerAttendanceTab)
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
        addNewAttendanceTab: builder.mutation({
            query: initialAttendanceTab => ({
                url: '/attendanceTab',
                method: 'POST',
                body: {
                    ...initialAttendanceTab,
                }
            }),
            invalidatesTags: [
                { type: 'AttendanceTab', id: "LIST" }
            ]
        }),
        toggleOpenAttendanceTab: builder.mutation({
            query: ({id}) => ({
              url: '/attendanceTab/toggleOpen',
              method: 'PATCH',
              body: { id }
            }),
            invalidatesTags: [{ type: 'AttendanceTab', id: 'LIST' }],
          }),
        deleteAttendanceTab: builder.mutation({
            query: ({ id }) => ({
                url: `/attendanceTab`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AttedanceTab', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAttendanceTabQuery,
    useAddNewAttendanceTabMutation,
    useToggleOpenAttendanceTabMutation,
    useDeleteAttendanceTabMutation,
} = lecturerAttendanceTabApiSlice

// returns the query result object
export const selectLecturerAttendanceTabResult = lecturerAttendanceTabApiSlice.endpoints.getAttendanceTab.select()

// creates memoized selector
const selectLecturerAttendanceTabData = createSelector(
    selectLecturerAttendanceTabResult,
    lecturerAttendanceTabResult => lecturerAttendanceTabResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLecturerAttendanceTab,
    selectById: selectAttendanceTabById,
    selectIds: selectAttendanceTabIds
    // Pass in a selector that returns the lecturerAttendanceTab slice of state
} = lecturerAttendanceTabAdapter.getSelectors(state => selectLecturerAttendanceTabData(state) ?? initialState)