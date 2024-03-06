import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Router set up
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/search/SearchPage";
import DetailsPage from "./pages/details/DetailsPage";
import { searchLoader } from "./pages/search/searchLoader";
import { detailsLoader } from "./pages/details/detailsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // self closing jsx element. whenver user goes to root of our app (when theres just a '/' , we display the Root layout)
    children: [
      //  options of what components to display inside Root layout
      {
        index: true,
        element: <HomePage />, // default
      },
      {
        path: "/search", // if user goes to localhost:5173/search , this element will be shown in Root Layout
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: "/packages/:name", // :name is wildcard
        element: <DetailsPage />,
        loader: detailsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
// router provider is like the same provider as context system. so we wrap our app using this
// loader is a function that will recieve info about route we are naviagting to, make request, return some data. Browser router will automaticallt call it and expose the data to search page component
// when we are returning data.objects from the get request we just made, we are getting a very large SearchResponse, we will use TS to understand the structure of response using an interface. This Interface will be called Search Response and it will describe the response object we are getting back. Then we will map over SearchResponse, and build up an array of  new objects, that are nicer and easier to work with called PackageSummary[]objects. When we map the response we get back, we will get an array of these objects. We will say that each package summary is gonna have a name, version, description and keywords contains an array of strings. The SearchResponse interface will help us niccely use between all of our components and have a common idea of what a packagesummary is. similar to previus google maps project.
