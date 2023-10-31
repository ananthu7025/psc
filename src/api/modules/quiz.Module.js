import { api } from "../index";



const quizApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuizQuestions: build.query({
      query: ({ category, subCategory }) => ({
        url: `/questions?category=${category}&subCategory=${subCategory}`,
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
    getFolder: build.query({
      query: () => ({
        url: `/folders`,
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
  }),
});

export const { useGetQuizQuestionsQuery,useGetFolderQuery } = quizApi;
