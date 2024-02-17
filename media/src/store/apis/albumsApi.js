import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums", // this is property name in big state where we want state to be maintained, key named albums for store reducer
  baseQuery: fetchBaseQuery({
    // gives us pre configured version of 'fetch'
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    // called automatically
    return {
      fetchAlbums: builder.query({
        // fetchAlbums used as template for name of hook called albumsApi.useFetchAlbumsQuery() we will use later
        query: (user) => {
          // user is object with id and name
          return {
            url: "/albums", // joined to baseUrl in baseQuery
            params: {
              userId: user.id, //
            },
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
// we need to connect this api to our store. creating this api automatically makes us a SLICE. this slice will make a combined reducer
