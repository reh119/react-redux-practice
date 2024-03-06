// for loader
// will be called with request object
import { searchPackages } from "../../api/queries/searchPackages";
import type { PackageSummary } from "../../api/types/packageSummary";

export interface SearchLoaderResult{
    searchResults: PackageSummary[]; // our searchLoader will return an object that has a searchResult property which will be an array of PackageSummary. now that we have this interferace, we can add a return type annotation to the following searchLoader function ! fixing the unknown data in SearchPage
}

export async function searchLoader({ request }: {request: Request}): Promise <SearchLoaderResult>{
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term");

    if (!term) {
      throw new Error("Search Term must be provided");
    }
    const results = await searchPackages(term);

    return {
        searchResults: results
    }
  }
  // function that will get some data for out searchPage component
  // searchLoader is making use of searchPackages(term)
  // when user is about to navigate to SearchPage file / component React Router will call SearchLoader, and SearchLoader will fetch data and return its results. Then, ReactRouter will render the SearchPage component to the screen. Inside of SearchPage, we make use of the useLoaderData() hook. This hook will automatically find whatever value we have returned from SearchLoader(results) and its going to assign that object to a data variable(in SearchPage). So the data variable in SearchPage is the searchResults: results object returned in searchLoader