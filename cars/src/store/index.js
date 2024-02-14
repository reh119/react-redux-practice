import { configureStore } from "@reduxjs/toolkit";
import {
  carsReducer,
  addCar,
  removeCar,
  changeSearchTerm,
} from "./slices/carsSlice";
import { formReducer, changeName, changeCost } from "./slices/formSlice";

const store = configureStore({
  reducer: {
    // dictates general shape of our state
    cars: carsReducer,
    form: formReducer,
  },
});
export { store, changeCost, changeName, changeSearchTerm, addCar, removeCar }; // action creators
