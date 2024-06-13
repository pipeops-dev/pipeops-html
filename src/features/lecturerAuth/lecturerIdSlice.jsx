import { createSlice } from '@reduxjs/toolkit';

const lecturerIdSlice = createSlice({
  name: 'lecturerId',
  initialState: null,
  reducers: {
    setLecturerId: (state, action) => action.payload,
  },
});

export const { setLecturerId } = lecturerIdSlice.actions;

export default lecturerIdSlice.reducer;