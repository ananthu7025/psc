import { api } from "../index";



const quizApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReferal: build.query({
      query: () => ({
        url: `/referrals`,
        method: 'GET',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; 
        } catch (err) {
          console.log('ERROR fetching quiz questions', err);
          return err;
        }
      },
    }),
    getAllUser: build.query({
        query: () => ({
          url: `/admin/users`,
          method: 'GET',
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            return data; 
          } catch (err) {
            console.log('ERROR fetching quiz questions', err);
            return err;
          }
        },
      }),
      updateIsPaidStatus: build.mutation({
        query: (params) => ({
          url: `user/update-isPaid`,
          method: 'PUT',
          body: params,
        }),
      }),
  }),
});

export const { useGetReferalQuery,useGetAllUserQuery,useUpdateIsPaidStatusMutation } = quizApi;
