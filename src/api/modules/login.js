
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
          localStorage.setItem('Paid', data.user.isPaid);
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
          localStorage.setItem('Paid', data.user.isPaid);
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('storage_Key')}`,
        },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data)
          localStorage.setItem('Paid', data.isPaid);
          return data;
        } catch (err) {
          console.log('ERROR', err);
          return err;
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useResendOtpMutation, useGetUserDetailsQuery, useCreateProfileMutation } = loginApi;
