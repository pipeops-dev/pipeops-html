import { studentApiSlice } from "../../app/api/studentApiSlice";
import { logOut } from "../../../studentAuthSlice";

export const studentAuthApiSlice = studentApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getStudentById: builder.query({
      query: (id) => `/students/student/${id}`,
      transformResponse: (responseData) => {
        const transformedData = { ...responseData, id: responseData._id };
        return transformedData;
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/student/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/student/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/student/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(studentApiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/student/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStudentByIdQuery,
  useSignupMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = studentAuthApiSlice;
