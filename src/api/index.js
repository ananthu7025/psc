import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api',
    prepareHeaders: (headers) => {
      const userToken = localStorage.getItem('storage_Key'); 
      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      }
      headers['Content-Type'] = 'application/json';
      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'api',
});
