import { configureStore } from "@reduxjs/toolkit";
import { studentApiSlice } from "./api/studentApiSlice";
import { lecturerApiSlice } from "./api/lecturerApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import studentAuthReducer from "../features/studentAuth/studentAuthSlice";
import lecturerAuthReducer from "../features/lecturerAuth/lecturerAuthSlice";
import studentIdReducer from "../features/studentAuth/studentIdSlice"; 
import lecturerIdReducer from "../features/lecturerAuth/lecturerIdSlice";

export const store = configureStore({
  reducer: {
    [studentApiSlice.reducerPath]: studentApiSlice.reducer,
    [lecturerApiSlice.reducerPath]: lecturerApiSlice.reducer,
    lecturerAuth: lecturerAuthReducer,
    studentAuth: studentAuthReducer,
    studentId: studentIdReducer, 
    lecturerId: lecturerIdReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(studentApiSlice.middleware)
      .concat(lecturerApiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
