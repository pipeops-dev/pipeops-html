import { createSlice } from '@reduxjs/toolkit';

const studentIdSlice = createSlice({
  name: 'studentId',
  initialState: null,
  reducers: {
    setStudentId: (state, action) => action.payload,
  },
});

export const { setStudentId } = studentIdSlice.actions;

export default studentIdSlice.reducer;