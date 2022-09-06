import { api } from './api';

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
           query: () => '/users',
           providesTags: (users, err, args) => 
                Array.isArray(users)?
                    [...users.map(user => ({ type: 'User', id: user.id })), { type: 'User', id: 'LIST' }] :
                    [{ type: 'User' }]
        }),
        getUser: build.query({
            query: (id) => `/users/${id}`,
            providesTags: (user, err, args) => 
                user? 
                    [{ type: 'User', id: user.id }] :
                    [{ type: 'User' }]
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: (result, err, args) => [{ type: 'User', id: 'LIST' }],
        }),
        editUser: build.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: (result, err, id) => [{ type: 'User', id }],
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, err, id) => [{ type: 'User', id }],
        }),
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
} = userApi;