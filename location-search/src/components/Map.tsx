import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet"; // js library
import type { Place } from "../api/Place";
import { useEffect, useRef } from "react"; // useEffectused to pand map around automatically when place prop changed, useRef hook used to get direct reference to Map to control Map object
import { MapContainer, TileLayer, Marker } from "react-leaflet"; // used to react and leaflet work together

interface MapProps {
  place: Place | null; // will recieve a prop called place of type Place or null
}

export default function Map({ place }: MapProps) {
  // place prop annotated using MapProps interface. this prop is our state being passed from app
  const mapRef = useRef<LeafletMap | null>(null); // mapref is leaflet map or null

  useEffect(() => {
    //we use this because we want to make sure that when we re render this component and the "place" prop changes, we get a reference to the map and tell the map that it needs to fly/zoom in on new location
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <MapContainer
      ref={mapRef}
      center={[40.7, -74]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
}

/* Notes: 
    Why define MapProps interface? 
Code Clarity and Readability: Using an interface like MapProps clearly communicates the expected props for the Map component. It serves as documentation for other developers working on the project, making it easier to understand the component's API.

Type Reusability: If you have multiple components that expect the same set of props, defining an interface allows you to reuse that type definition across multiple components, ensuring consistency and reducing duplication in your codebase.

Encapsulation: By defining an interface specifically for the props of the Map component, you encapsulate the knowledge of how the Map component expects to receive its props. This encapsulation can make your code more maintainable and easier to modify in the future.

Static Analysis: Interfaces provide a way for TypeScript to perform static analysis on your code, catching errors and providing helpful hints about how your components should be used.

*/
