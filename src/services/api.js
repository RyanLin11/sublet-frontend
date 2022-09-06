import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL, credentials: "include" }),
    tagTypes: ['Listing', 'User', 'Group'],
    endpoints: (builder) => ({})
});