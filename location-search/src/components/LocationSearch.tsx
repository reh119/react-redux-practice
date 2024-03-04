import type { Place } from "../api/Place";
import { Fragment, useState } from "react";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]); // search results of place objects. will be state, the fetched list of placess aka an array of Place objects
  // we need to put in a gneric type to tell TS what type of array this will be since it doesnt have enought info for type inference
  const [term, setTerm] = useState(""); // type inference

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // type for event object^
    // form submission will recieve an event object and we want to prevent the default browser action
    event.preventDefault();
    const results = await search(term);
    console.log(results);
    if (results) {
      setPlaces(results);
    } else {
      // Handle case when results are undefined (e.g., display an error message)
      console.error("No results found or error occurred.");
    }

    //setPlaces(results); // now formatted correctly to Places interface, and we can now update state
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        ></input>
      </form>
      <h1 className="font-bold mt-6">Found Locations </h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm"> {place.name}</p>
              <button
                className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
                onClick={() => onPlaceClick(place)}
              >
                Go
              </button>
              <div className="border-b w-full col-span-2" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
/* 
This component expects to recieve a prop called onPlaceClick a function with a 'signiture' of (place: Place) => void; 

LocationSearch component will need to have a form a user can fill out and type in search term. when go or enter is pressed we will reach out to location api aand do some kind of search

The htmlFor attribute is used to associate the <label> with the input field.
The type="text" attribute is optional for text input fields, as the default type is "text".
The term value is accessed directly within the handleSubmit function from the component's state, without needing to be explicitly passed as a parameter. This is possible because React maintains the state within the component.

Using Fragment because we want to use grid styling. Grid styling works when we dont have a bunch of intermediate HTML elements being displayed. We dont want to wrao each list item in divs , so we can use a Fragment. When fragment is rendered, no element actually shows up inside the DOM. 

for our call back prop 'onPlaceClick' , we need to remeber to pass in a place object when called
*/
