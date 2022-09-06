import { api } from './api';

const listingApi = api.injectEndpoints({
    endpoints: (build) => ({
        getListings: build.query({
            query: (options) => ({
                url: '/listings',
                params: options.params,
            }),
            providesTags: (listings, error, args) => 
                Array.isArray(listings)?
                    [...listings.map(listing => ({ type: 'Listing', id: listing.id })), { type: 'Listing', id: 'LIST' }] :
                    [{ type: 'Listing' }]
        }),
        getListing: build.query({
            query: (id) => `/listings/${id}`,
            providesTags: (listing, error, args) => 
                listing? 
                    [{ type: 'Listing', id: listing.id }] :
                    [{ type: 'Listing' }],
            transformResponse: (listing, meta, arg) => 
                Array.isArray(listing) && listing.length > 0? 
                    listing[0] : 
                    null,
        }),
        createListing: build.mutation({
            query: (listing) => ({
                url: '/listings',
                method: 'POST',
                body: listing,
            }),
            invalidatesTags: (result, err, args) => [{ type: 'Listing', id: 'LIST' }],
        }),
        editListing: build.mutation({
            query: (listing) => ({
                url: `/listings/${listing.id}`,
                method: 'PUT',
                body: listing,
            }),
            invalidatesTags: (listing, error, args) => [{ type: 'Listing', id: listing.id }],
        }),
        deleteListing: build.mutation({
            query: (id) => ({
                url: `/listings/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (listing, error, id) => [{ type: 'Listing', id }],
        })
    })
});

export const {
    useGetListingsQuery,
    useGetListingQuery,
    useCreateListingMutation,
    useEditListingMutation,
    useDeleteListingMutation
} = listingApi;