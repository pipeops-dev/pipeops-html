import { lecturerApiSlice } from "../../app/api/lecturerApiSlice";
import { logOut } from "./lecturerAuthSlice";

export const lecturerAuthApiSlice = lecturerApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getLecturerById: builder.query({
      query: (id) => `/lecturers/lecturer/${id}`,
      transformResponse: (responseData) => {
        const transformedData = { ...responseData, id: responseData._id };
        return transformedData;
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/lecturer/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/lecturer/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/lecturer/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data)
          dispatch(logOut());
          setTimeout(() => {
            dispatch(lecturerApiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/lecturer/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLecturerByIdQuery,
  useSignupMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = lecturerAuthApiSlice;
