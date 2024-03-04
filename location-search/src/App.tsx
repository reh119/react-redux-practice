import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";
import type { Place } from "./api/Place";
import { useState } from "react";

// similar to map, this will have a place state that can be null or of Type Place

function App() {
  const [place, setPlace] = useState<Place | null>(null); // generic type inference in useState. useState is a generic function we need to place a generic type or ts will guess its type based on its starting argument (null)

  return (
    <div className="h-screen w-screen grid grid-cols-12">
      <div className="col-span-3 p-2">
        <LocationSearch onPlaceClick={(p) => setPlace(p)} />
      </div>
      <div className="col-span-9">
        <Map place={place} />
      </div>
    </div>
  );
}

export default App;

/*
App Architechture: 

Interface: 
  We will define an interface named 'Place' so that our Components can know how our Place object is defined. Avoiding redefing what a place object is inside each componenet. 


When user clicks 'go' after they type in the location, App will pass a callback function called onPlaceClick to LocationSearch. 
onPlaceClick is going to be a function in App.tsx that is going to be called with a 'Place object' aka an object that satisfies the place interface. We dont need it tp return anything, so we can use => void

 make sure place is being updated correctl before moving on to map component. map component will show the place of wherever the user has clicked "go" on after making a search

*/
