import { createSlice } from "@reduxjs/toolkit";
import {addCar} from './carsSlice'

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
  extraReducers(builder) { // we want to watch for the cars/addCar action type, so when user adds a car, the fields reset. 
    builder.addCase(addCar, (state,action) => {
      state.name = ''; 
      state.cost = 0; 
    })

  }
});

export const {changeName, changeCost} = formSlice.actions; 
export const formReducer = formSlice.reducer; // this is the one single combined global reducer

 /* Note:
    - we need to remember every time we dispatch an action we need to provide a payload!!!!

 */