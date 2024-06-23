import { createSlice } from '@reduxjs/toolkit'

const studentAuthSlice = createSlice({
    name: 'studentAuth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = studentAuthSlice.actions

export default studentAuthSlice.reducer

export const selectCurrentToken = (state) => state.studentAuth.token