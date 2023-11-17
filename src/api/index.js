import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api',
    prepareHeaders: (headers) => {
      // Replace AsyncStorage with your preferred method for handling async storage in a web app
      const userToken = localStorage.getItem('storage_Key'); // Use localStorage or another storage method
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
