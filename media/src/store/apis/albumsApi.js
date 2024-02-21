import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker"; // for fake album title

const pause = (duration) => {
  // pause when users are fetched or when request is issued
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums", // this is property name in big state where we want state to be maintained, key named albums for store reducer
  baseQuery: fetchBaseQuery({
    // gives us pre configured version of 'fetch'
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // remove for production since we dont want a pause. this is just to visually see spinner
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    // called automatically
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          // dont need user because before we needed a user to make request to make and fetch albums. user object was only needed to to customize some aspects of the request. we just need the album id for the album we want to delete
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      // --------------------------------------------------
      addAlbum: builder.mutation({
        invalidatesTags: (results, error, user) => {
          return [{ type: "UsersAlbums", id: user.id }];
        }, // for refetching
        query: (user) => {
          // we need to know what user to tie the album too
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      // --------------------------------------------------
      fetchAlbums: builder.query({
        // fetchAlbums used as template for name of hook called albumsApi.useFetchAlbumsQuery() we will use later
        providesTags: (result, error, user) => {
          // user is what is passed into our hook when its called in component
          // results is list of albums returned from request
          const tags = result.map((album) => {
            // so we are mapping over every album, and for each one we return an album with its respective album id
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id }); // add type of user albums with users id
          return tags;
        }, // for re fetching
        query: (user) => {
          // user is object with id and name
          return {
            url: "/albums", // joined to baseUrl in baseQuery
            params: {
              userId: user.id, // because we want to get this specifc id
            },
            method: "GET",
          };
        },
      }),
    };
  },
});
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;

export { albumsApi };
/*  Notes: 
  we need to connect this api to our store. creating this api automatically makes us a SLICE. this slice will make a combined reducer
  
  Reminder: when building an api, we add in a 'endpoints' function that will return an object with several keys and values along with them. The keys fecthAlbums is used to gnerate custome 
  hooks that we will use inside of out components 

  inside 'endpoint' query isnt do much a function called query but a function that tell RTKQ about some params to use for our request
*/
