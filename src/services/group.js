import { api } from './api';

const groupApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGroups: build.query({
            query: () => '/groups',
            providesTags: (groups, err, args) => 
                Array.isArray(groups)? 
                    [...groups.map(group => ({ type: 'Group', id: group.id })), { type: 'Group', id: 'LIST' }] : 
                    [{ type: 'Group' }],
        }),
        getGroup: build.query({
            query: (id) => `/groups/${id}`,
            providesTags: (group, err, id) => 
                group? 
                    [{ type: 'Group', id: group.id }] :
                    [{ type: 'Group' }]
        }),
        createGroup: build.mutation({
            query: (group) => ({
                url: '/groups',
                method: 'POST',
                body: group,
            }),
            invalidatesTags: (group, err, args) => [{ type: 'Group', id: 'LIST' }],
        }),
        deleteGroup: build.mutation({
            query: (id) => ({
                url: `/groups/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, err, id) => [{ type: 'Group', id }],
        }),
    })
});

export const {
    useGetGroupsQuery,
    useGetGroupQuery,
    useCreateGroupMutation,
    useDeleteGroupMutation,
} = groupApi;