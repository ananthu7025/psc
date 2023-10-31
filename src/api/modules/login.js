
import { api } from '../index';
import { loginSuccess, updateUserData } from '../../store/reducers/loginReducer';


export const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (details) => ({
        url: '/user/register',
        method: 'POST',
        body: details,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('storage_Key', data.accessToken);
          dispatch(loginSuccess(data));
          return data;
        } catch (err) {
          console.log('ERROR', err);
          return err;
        }
      },
    }),
    signUp: build.mutation({
      query: (otp) => ({
        url: '/user/verify',
        method: 'POST',
        body: otp,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('storage_Key', data.accessToken);
          localStorage.setItem('UserId', data.user.userId);

        console.log(data.user)
        console.log(data.user.userId)

          dispatch(loginSuccess(data));
          dispatch(updateUserData(data.user));

          return data;
        } catch (err) {
          console.log('ERROR', err);
          return err;
        }
      },
    }),
    createProfile: build.mutation({
      query: (profile) => ({
        url: 'user/create-profile',
        method: 'POST',
        body: profile,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.log('ERROR', err);
          return err;
        }
      },
    }),
    resendOtp: build.mutation({
      query: (email) => ({
        url: 'user/resend-otp',
        method: 'POST',
        body: email,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserData(data.user));
          return data;
        } catch (err) {
          console.log('ERROR', err);
          return err;
        }
      },
    }),
    getUserDetails: build.query({
      query: () => ({
        url: '/user/userDetails',
        method: 'GET',
        // Pass the token in the headers
        headers: {
          Authorization: `Bearer ${localStorage.getItem('storage_Key')}`, // Get the token from local storage
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useResendOtpMutation,useGetUserDetailsQuery,useCreateProfileMutation } = loginApi;
