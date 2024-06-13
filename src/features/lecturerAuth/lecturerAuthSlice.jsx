import { createSlice } from '@reduxjs/toolkit'

const lecturerAuthSlice = createSlice({
    name: 'lecturerAuth',
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

export const { setCredentials, logOut } = lecturerAuthSlice.actions

export default lecturerAuthSlice.reducer

export const selectCurrentToken = (state) => state.lecturerAuth.token