import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApi";

export const store = configureStore({
  reducer: {
    // big state
    users: usersReducer, // comes from users slice
    [albumsApi.reducerPath]: albumsApi.reducer, // looks up reducer path propery if albumsApi(string) , whatver this string is put a new key inside this object of what that string is  (doesnt create array!)
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});
setupListeners(store.dispatch); // one time setup

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export { useFetchAlbumsQuery } from "./apis/albumsApi"; // step 8
