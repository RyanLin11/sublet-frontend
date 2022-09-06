import { api } from './api';

const sessionApi = api.injectEndpoints({
    endpoints: (build) => ({
        createSession: build.mutation({
            query: (options) => ({
                url: '/sessions',
                method: 'POST',
                body: options
            }),
            invalidatesTags: (session, error, args) => [{ type: 'Session', id: 'me' }],
        }),

        getMySession: build.query({
            query: () => '/sessions/me',
            providesTags: (session, error, args) => [{ type: 'Session', id: 'me' }],
            transformResponse: (sessions, meta, arg) => sessions.user_id,
        }),

        deleteMySession: build.mutation({
            query: () => ({
                url: '/sessions/me',
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Session', id: 'me' }],
        }),
    })
});

export const {
    useCreateSessionMutation,
    useGetMySessionQuery,
    useDeleteMySessionMutation,
} = sessionApi;