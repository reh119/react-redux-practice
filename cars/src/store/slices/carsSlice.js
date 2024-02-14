import { createSlice, nanoid} from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {  // this is object because we have two properties we need to maintain
    searchTerm: "",
    data: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload; // action is payload that will be new search term
    },
    addCar(state, action) {
      state.data.push({
        // has name and cost, we need to get access to other slice (form slice) so we can know what name and cost is. this is not allowed/allowed
        //  assumption -> action.payload === { name: 'ab' , cost: 140}
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),// redux toolkit function specifically for this 
      });
    },
    removeCar(state, action) {
        // assumption -> action.payload === the id of car we want to remove!!!!! 
        const updated = state.data.filter((car) => { // for every 'car' 
            return car.id !== action.payload // return and add every car that does not match the action payload id. 
        });
        state.data = updated;  // update state 
    },
  },
});
export const {changeSearchTerm, addCar, removeCar} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;  

 /* Note:
    - we need to remember every time we dispatch an action we need to provide a payload!!!!

 */