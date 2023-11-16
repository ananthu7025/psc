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
    getAllQuestions: build.query({
      query: () => ({
        url: `/all-questions`,
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
    getResult: build.query({
      query: (userId) => {
        if (userId) {
          return {
            url: `/user-results/${userId}`,
            method: 'GET',
          };
        }
        // Return a placeholder object or null when userId is not present
        return null;
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          // Check if the query object is present before making the API call
          const queryObject = queryFulfilled();
          if (queryObject) {
            const { data } = await queryObject;
            return data;
          }
          // Return some default value when userId is not present
          return null;
        } catch (err) {
          console.log('ERROR fetching quiz questions', err);
          return err;
        }
      },
    }),
    editQuestion: build.mutation({
      query: ({ questionId, updatedQuestionData }) => ({
        url: `/edit-question/${questionId}`,
        method: 'PUT',
        body: updatedQuestionData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          debugger
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.error('ERROR editing question', err);
          return err;
        }
      },
    }),

    // Delete a question
    deleteQuestion: build.mutation({
      query: (questionId) => ({
        url: `/delete-question/${questionId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          debugger

          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.error('ERROR deleting question', err);
          debugger

          return err;
        }
      },
    }),

    createQuestion: build.mutation({
      query: (newQuestionData) => ({
        url: '/create-question',
        method: 'POST',
        body: newQuestionData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.error('ERROR creating question', err);
          return err;
        }
      },
    }),
  }),
});

export const { useGetQuizQuestionsQuery, useGetFolderQuery, useGetResultQuery, useCreateQuestionMutation, useGetAllQuestionsQuery, useDeleteQuestionMutation, useEditQuestionMutation } = quizApi;
