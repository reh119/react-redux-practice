import { useLoaderData } from "react-router-dom";
import type { SearchLoaderResult } from "./searchLoader";
import PackageListItem from "../../components/PackageListItem";

export default function SearchPage() {
  //  we need to use typsecript to fix this. we use type assertion.
  // to summarize, data is an array of Package Summary Results
  // console.log(data.searchResults);
  // const data = useLoaderData() as SearchLoaderResult;
  const { searchResults } = useLoaderData() as SearchLoaderResult;

  const renderedResults = searchResults.map((result) => {
    return <PackageListItem pack={result} key={result.name} />;
  });
  return (
    <div>
      <h1 className="text-2xl font-bold my-6"> Search Results!</h1>
      <div className="space-y-4 mt-4">{renderedResults}</div>
    </div>
  );
}
// In order to fix the problem of data returning 'unknown' type is we need to form a better connection between searchLoader, what it returns and the searchPage when useLoaderData is called. We do this by adding a interface in searchLoader. and then a type annotation to the searchLoader function so we can tell TS what the function will return
// to summarize, data is an array of Package Summary Results. We now want to map over these objects, and render them out in a list. The best way to do this is to make a reusable component called 'package list item' that will render just one of the single packages that we will pass as props from here
