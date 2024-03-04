import type { Place } from "./Place";
interface SearchResponse {
    features: {
        geometry: {
            coordinates: number[];
        }
        properties: { 
            place_id: number;
            display_name: string; 
        }
    } []
}

export const search = async (term: string) => {
    // term is search term from our form in LocationSearch
    const res = await fetch (`https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    ); 
    const data: SearchResponse = await res.json(); // data is 'any' data type which we dont want. we can use a interface to define its structure, will need to use type assesrtion to tell TS what type it is 
    // now we need to take this data we got back and format it so that our components can use it. They are expecting to see a Place Object (that we defined in as a Place interface). 
    // process data into a type the rest of our app expects to recieve it
    const places: Place[] = data.features.map((feature) => { // for each feature in data, we need to return properties from Place interface
        // places will be an array of Place objects
        return {
            id: feature.properties.place_id, 
            name: feature.properties.display_name,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1], 
            // doing the above, we have successfully turned the data fetched from api into an array of Place objects will work with all other components
        }
    })
    return places;
}
