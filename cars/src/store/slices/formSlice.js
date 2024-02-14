import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  // keeps track of two seperate properties inside initialStore
  name: "form", // name of slice 
  initialState: {
    name: "",
    cost: 0,
  },
  reducers: {
    // ways of changing state, these are our mini reducers
    changeName(state, action) { // user will input name in form 
      state.name = action.payload;
    }, // action.payload will tell us new name
    changeCost(state, action) { // user will input cost form
      state.cost = action.payload;
    }, // action.payload will tell us new cost
  },
});

export const {changeName, changeCost} = formSlice.actions; 
export const formReducer = formSlice.reducer; // this is the one single combined global reducer

 /* Note:
    - we need to remember every time we dispatch an action we need to provide a payload!!!!

 */