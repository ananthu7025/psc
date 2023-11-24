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
          console.log('ERROR fetching referrals', err);
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
          console.log('ERROR fetching all users', err);
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
    getCategories: build.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.log('ERROR fetching categories', err);
          return err;
        }
      },
    }),
    createCategory: build.mutation({
      query: (params) => ({
        url: '/categories',
        method: 'POST',
        body: params,
      }),
    }),
    editCategory: build.mutation({
      query: (params) => ({
        url: `/categories/${params.categoryId}`,
        method: 'PUT',
        body: params,
      }),
    }),
    deleteCategory: build.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
      }),
    }),
    getSubcategories: build.query({
      query: () => ({
        url: '/subcategories',
        method: 'GET',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.log('ERROR fetching subcategories', err);
          return err;
        }
      },
    }),
    createSubcategory: build.mutation({
      query: (params) => ({
        url: '/subcategories',
        method: 'POST',
        body: params,
      }),
    }),
    editSubcategory: build.mutation({
      query: (params) => ({
        url: `/subcategories/${params.subcategoryId}`,
        method: 'PUT',
        body: params,
      }),
    }),
    deleteSubcategory: build.mutation({
      query: (subcategoryId) => ({
        url: `/subcategories/${subcategoryId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetReferalQuery,
  useGetAllUserQuery,
  useUpdateIsPaidStatusMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useEditSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = quizApi;
